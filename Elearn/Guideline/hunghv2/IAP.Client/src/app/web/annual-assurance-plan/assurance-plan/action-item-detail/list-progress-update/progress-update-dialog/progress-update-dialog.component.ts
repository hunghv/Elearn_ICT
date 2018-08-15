import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ActionItemProgress } from '../../../../../../shared/models/IAP/action-item/action-item-progress/action-item-progress.model';
import { ActionItemProgressService } from '../../../../../../shared/services/IAP/action-item/update-progress.service/update-progress.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';
import { MasterDataUrlConstants } from '../../../../../../shared/constants/url.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FindingsDialogComponent } from '../../../checklist-detail/list-findings-item/findings-dialog/findings-dialog.component';
import { AppError } from '../../../../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../../../../shared/services/data-service/not-found-error';

@Component({
  selector: 'iap-progress-update-dialog',
  templateUrl: './progress-update-dialog.component.html',
  styleUrls: ['./progress-update-dialog.component.scss']
})
export class ProgressUpdateDialogComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public actionItemProgressService: ActionItemProgressService,
    private dialogHelper: DialogHelperService,
    private dialogRef: MatDialogRef<FindingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.actionItemProgress = data.actionItemProgress || null;
      this.parentId = data.parentId || '';
    }
  }

  message = MessageConstant;
  mdConstants = MasterDataUrlConstants;
  actionItemProgress: ActionItemProgress;
  form: FormGroup;
  parentId = '';
  listAttachmentId: any[] = [];
  isShowErrorAttachment = false;

  ngOnInit() {
    if (this.actionItemProgress) {
      this.listAttachmentId = this.actionItemProgress.listAttachmentId;
    }
    this.loadForm();
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.actionItemProgressService.create(this.form.value)
      .subscribe(res => {
        // pass data to list ap to render new resource with out call api
        this.dialogRef.close(res);
      },
        (error: AppError) => {
          // handle expected error;
          if (error instanceof NotFoundError) {
            this.dialogHelper.showError('This finding doesnt exist');
          } else {
            // or just log error message from server
            this.dialogHelper.showError(error.originalError.exceptionMessage);
          }
        });
  }

  loadForm() {
    this.form = this.fb.group({
      id: this.newGuid(),
      completionStatus: ['', Validators.required],
      progressUpdateDate: [Date.now(), Validators.required],
      completionPercentage: ['', Validators.required],
      remark: ['', Validators.required],
      actionItemId: this.parentId,
      listAttachmentId: []
    });

  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleAfterUpload(uploadedId) {
    this.listAttachmentId.push(uploadedId);
    this.listAttachmentId = [...this.listAttachmentId];

    this.form.value.listAttachmentId = this.listAttachmentId;
  }

  handleAfterDelete(deletedId) {
    this.listAttachmentId = this.listAttachmentId.filter(id => {
      return id !== deletedId;
    });

    this.form.value.listAttachmentId = this.listAttachmentId;
  }

  handleBeforeUpload(postData) {
    if (typeof postData.append === 'function') {
      postData.append('referenceId', this.actionItemProgress.id);
    }
    else {
      postData.referenceId = this.actionItemProgress.id;
    }
  }

  onchangeStatus(data)
  {
    if(data.value === 'Open')
    {
      this.form.controls.completionPercentage.setValue('');
    }else{
      this.form.controls.completionPercentage.setValue(100);
    }
  }
}
