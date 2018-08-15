import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
// tslint:disable-next-line:max-line-length
import { AssurancePlanDialogComponent } from '../../../../../web/annual-assurance-plan/assurance-plan/assurance-plan-dialog/assurance-plan-dialog.component';
import { } from 'events';
import { AssurancePlan } from '../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { AssurancePlanService } from '../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { DatePipe } from '@angular/common';
import { DialogHelperService } from '../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-ap',
  templateUrl: './ap.component.html',
  styleUrls: ['./ap.component.scss']
})
export class ApComponent implements OnInit {
  @Input() assurance: AssurancePlan;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
  dateView: string;
  isFC = false;
  startDate: string;
  endDate: string;
  constructor(
    private datePipe: DatePipe,
    public dialogHelper: DialogHelperService,
    private dialog: MatDialog,
    private assuranceService: AssurancePlanService) { }
  ngOnInit() {
    // debugger;
    this.dateView = this.datePipe.transform(this.assurance.insertedAt, 'HH:mm, dd MMM yyyy');
    this.startDate = this.datePipe.transform(this.assurance.startDate, 'dd MMM yyyy');
    this.endDate = this.datePipe.transform(this.assurance.endDate, 'dd MMM yyyy');
  }
  edit() {
    const assuranceRef = this.dialog.open(AssurancePlanDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      position: {
        top: '50px'
      },
      data: { assuranceId: this.assurance.id, isEdit: true }
    });
    assuranceRef.afterClosed().subscribe(data => {
      this.assurance = data;
    });
  }
  onDelete() {
    this.dialogHelper.
      showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_ASSURANCE_PLAN_ITEM).
      subscribe(confirm => {
        if (confirm) {
          this.assuranceService.deleteById(this.assurance.id)
            .subscribe(data => {
              if (data) {
                this.dialogHelper.showSuccess(MessageConstant.MESSAGE_DELETE_SUCCESS);
                this.onDeleteClick.emit(data.id);
              }
            });
        }
      });
  }
}
