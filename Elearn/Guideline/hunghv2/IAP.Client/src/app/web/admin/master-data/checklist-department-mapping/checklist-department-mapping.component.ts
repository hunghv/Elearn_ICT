import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ChecklistDeparmentMappingDetailDialogComponent } from './checklist-deparment-mapping-detail-dialog/checklist-deparment-mapping-detail-dialog.component';

@Component({
  selector: 'iap-checklist-department-mapping',
  templateUrl: './checklist-department-mapping.component.html',
  styleUrls: ['./checklist-department-mapping.component.scss']
})
export class ChecklistDepartmentMappingComponent implements OnInit {

  form;
  lstOpu: any[];
  constructor(
    private dialog : MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const CDMappingRef = this.dialog.open(ChecklistDeparmentMappingDetailDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      width: '80vw',
      position: {
        top: '50px'
      },
    });
    CDMappingRef
      .afterClosed()
      .subscribe(ap => {
        if (ap) {
          // this.listAItemProgress.push(ap);
        }
      });
  }
}
