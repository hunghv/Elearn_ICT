import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateUserRoleDialogComponent } from './create-user-role-dialog/create-user-role-dialog.component';

@Component({
  selector: 'iap-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openCreateUserRole() {
    const assuranceRef = this.dialog.open(CreateUserRoleDialogComponent, {
      width: '1000px',
      maxWidth: '80vw',
      maxHeight: '90vh',
      position: {
        top: '50px'
      }
    });
  }

}
