import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressBookComponent } from './address-book/address-book.component';
import { UserControlInfo } from '../../../models/common.model';
import { UserProfileService } from '../../../services/IAP/profile/user-profile.service';
import { MDUserProfileService } from '../../../services/IAP/profile/md-user-profile.service';

@Component({
  selector: 'iap-people-picker',
  templateUrl: './people-picker.component.html',
  styleUrls: ['./people-picker.component.scss']
})
export class PeoplePickerComponent implements OnInit, OnChanges {
  @Input() placeholder: string;
  @Input() defaultRole: string;
  @Input() isRequire: boolean;
  @Input() selectedUser: UserControlInfo;
  @Input() getForId: string;

  @Output() selectedUserChange = new EventEmitter<any>();

  public hasError: boolean;
  constructor(private dialog: MatDialog,
    private userProfileService: UserProfileService,
    private mdUserProfileservice: MDUserProfileService
  ) {
    this.hasError = false;
  }

  ngOnChanges() {
    if (this.getForId) {
      this.mdUserProfileservice.getUserRolesById(this.getForId).subscribe((user: UserControlInfo) => {
        this.selectedUser = user;
        this.selectedUserChange.emit(this.selectedUser);
      });
    }
  }

  ngOnInit() {

  }

  removeUser(event) {
    this.selectedUser = null;
    if (this.isRequire) {
      this.hasError = true;
    }
    this.selectedUserChange.emit(this.selectedUser);
    event.stopPropagation();
  }

  activeErrorClass(defaultRole: string) {
    if (this.defaultRole === defaultRole) {
      return this.hasError === true;
    }
  }

  openAddressBook() {
    const dialogRef = this.dialog.open(AddressBookComponent, {
      width: '700px',
      height: '80vh',
      position: {
        top: '50px'
      },
      data: {
        defaultRole: this.defaultRole,
        isRequire: this.isRequire
      }
    });

    dialogRef.afterClosed().subscribe((data: UserControlInfo) => {
      if (data) {
        this.selectedUser = data;
        this.selectedUser.peoplePickerType = this.defaultRole;
        this.hasError = false;
      } else {
        this.selectedUser = null;
        if (this.isRequire) {
          this.hasError = true;
        }
      }
      this.selectedUserChange.emit(this.selectedUser);
    });
  }

}
