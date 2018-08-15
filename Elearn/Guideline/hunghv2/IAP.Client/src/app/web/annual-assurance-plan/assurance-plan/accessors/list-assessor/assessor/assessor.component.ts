import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AssessorService } from '../../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assessor-service/assessor.service';
import { Assessor } from '../../../../../../shared/models/IAP/annual-assurance-plan/assessor/assessor.model';
import { EditAssessorDialogComponent } from '../../edit-assessor-dialog/edit-assessor-dialog.component';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-assessor',
  templateUrl: './assessor.component.html',
  styleUrls: ['./assessor.component.scss']
})
export class AssessorComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private assessorService: AssessorService,
    public dialogHelper: DialogHelperService
  ) { }
  @Input() assessor: Assessor;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }
  edit() {
    const assessorRef = this.dialog.open(EditAssessorDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      position: {
        top: '50px'
      },
      data: { assessor: this.assessor, isEdit: true }

    });
    assessorRef.afterClosed().subscribe(data => {
      this.assessor = data;
    });
  }

  onDelete() {
    this.onDeleteClick.emit(this.assessor);
    // this.dialogHelper.
    //   showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_ASSESSOR).
    //   subscribe(confirm => {
    //     if (confirm) {
    //         this.assessorService.deleteById(this.assessor.id)
    //         .subscribe(data => {
    //           if (data) {
    //             this.dialogHelper.showSuccess(MessageConstant.MESSAGE_DELETE_SUCCESS);
    //             this.onDeleteClick.emit(data.id);
    //           }
    //         });
    //     }
    //   });
  }
}
