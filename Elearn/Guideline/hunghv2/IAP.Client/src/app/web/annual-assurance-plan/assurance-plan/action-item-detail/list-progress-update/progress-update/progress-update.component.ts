import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionItemProgress } from '../../../../../../shared/models/IAP/action-item/action-item-progress/action-item-progress.model';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { ActionItemProgressService } from '../../../../../../shared/services/IAP/action-item/update-progress.service/update-progress.service';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';
import { ProgressUpdateDialogComponent } from '../progress-update-dialog/progress-update-dialog.component';

@Component({
  selector: 'iap-progress-update',
  templateUrl: './progress-update.component.html',
  styleUrls: ['./progress-update.component.scss']
})

export class ProgressUpdateComponent implements OnInit {
  @Input() actionItemProgress: ActionItemProgress;
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public dialogHelper: DialogHelperService,
    private actionItemProgressService: ActionItemProgressService) { }

  ngOnInit() {
  }

  onDelete() {
    this.dialogHelper.
      showConfirm(MessageConstant.MESSAGE_CONFIRM_DELETE_ACTION_ITEM_PROGRESS).
      subscribe(confirm => {
        if (confirm) {
          this.actionItemProgressService.deleteById(this.actionItemProgress.id)
            .subscribe(data => {
              if (data) {
                this.dialogHelper.showSuccess(MessageConstant.MESSAGE_DELETE_SUCCESS);
                this.onDeleteClick.emit(data.id);
              }
            });
        }
      });

  }

  openDetailDialog() {
    const progressUpdateRef = this.dialog.open(ProgressUpdateDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      width: '80vw',
      position: {
        top: '50px'
      },
      data: { actionItemProgress: this.actionItemProgress}
    });
  }
}