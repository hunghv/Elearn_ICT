import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditDepartmentAAPDialogComponent } from '../../../../annual-assurance-plan/opu-aap-detail/list-dept-aap/add-dept-aap-dialog/add-dept-aap-dialog.component';
import { DeptAAP } from '../../../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';

@Component({
  selector: 'iap-list-dept-aap-manual',
  templateUrl: './list-dept-aap-manual.component.html',
  styleUrls: ['./list-dept-aap-manual.component.scss']
})
export class ListDeptAapManualComponent implements OnInit {
  @Input() enterpriseId;
  @Input() lstDeptAAP: DeptAAP[];
  @Input() opuId;
  @Input() isAdmin;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    const deptAapRef = this.dialog.open(EditDepartmentAAPDialogComponent, {
      width: '900px',
      position: {
        top: '60px'
      },
      data: { opuId: this.opuId , enterpriseId: this.enterpriseId}
    });
    deptAapRef
      .afterClosed()
      .subscribe(deptAap => {
        if (deptAap != null && deptAap.length > 0) {
          for (let i = 0; i < deptAap.length; i++) {
            if (deptAap[i].status != null && deptAap[i].status !== '') {
              this.lstDeptAAP.push(deptAap[i]);
            }
          }
        }
      });
  }
}
