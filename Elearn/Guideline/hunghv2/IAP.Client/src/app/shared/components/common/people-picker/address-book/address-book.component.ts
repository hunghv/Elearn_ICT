import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserControlInfo } from '../../../../models/common.model';
import { MDUserProfileService } from '../../../../services/IAP/profile/md-user-profile.service';

@Component({
  selector: 'iap-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})

export class AddressBookComponent implements OnInit {
  // MatPaginator Inputs
  length = 50;
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  keyword = '';

  // MatPaginator Output
  pageEvent: PageEvent;
  filterBy: number;
  selectedRow: any;
  displayedColumns: string[];
  selectedUser: UserControlInfo;
  dataSource: MatTableDataSource<UserControlInfo>;
  defaultRole: string;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }



  constructor(
    private mdUserProfileService: MDUserProfileService,
    public dialogRef: MatDialogRef<AddressBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.displayedColumns = ['displayName', 'email', 'userRoles'];
    this.defaultRole = data.defaultRole;
    this.selectedRow = null;
    this.selectedUser = new UserControlInfo();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    this.mdUserProfileService.searchMDUserProfile(this.pageIndex, this.pageSize, this.defaultRole, this.keyword).subscribe(data => {
      this.length = data.totalCount;
      this.pageSize = 10;
      this.dataSource = new MatTableDataSource<UserControlInfo>(data.items);
    });
  }

  selectRow(row: any) {
    this.selectedRow = row;
  }

  onReturnData() {
    if (this.selectedRow) {
      this.selectedUser.id = this.selectedRow.id;
      this.selectedUser.displayName = this.selectedRow.displayName;
      this.selectedUser.email = this.selectedRow.email;
      this.selectedUser.userRoles = this.selectedRow.userRoles;
      this.selectedUser.opu = {
        name: this.selectedRow.opu.name,
        id: this.selectedRow.opu.id,
      };
      this.dialogRef.close(this.selectedUser);
    } else {
      this.dialogRef.close();
    }
  }

  handlePageChange(pageChange: PageEvent) {
    this.mdUserProfileService.
      searchMDUserProfile(pageChange.pageIndex + 1, pageChange.pageSize, this.defaultRole, this.keyword).
      subscribe(data => {
        this.length = data.totalCount;
        this.dataSource = new MatTableDataSource<UserControlInfo>(data.items);
      });
  }

  search() {
    this.mdUserProfileService.searchMDUserProfile(this.pageIndex, this.pageSize, this.defaultRole, this.keyword).subscribe(data => {
      this.length = data.totalCount;
      this.dataSource = new MatTableDataSource<UserControlInfo>(data.items);
    });
  }
}

