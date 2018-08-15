import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DueDateRequestExtension } from '../../../../../shared/models/IAP/action-item/action-item.model';
import { MessageConstant } from '../../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-request-due-date-dialog',
  templateUrl: './request-due-date-dialog.component.html',
  styleUrls: ['./request-due-date-dialog.component.scss']
})

export class RequestDueDateDialogComponent implements OnInit {
  form;
  dueDate;
  dueDateRequest;
  reasonRequestExtension;
  message = MessageConstant;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RequestDueDateDialogComponent>
  ) {
    this.dueDate = data.dueDate;
    this.dueDateRequest = data.dueDateRequestExtension;
    this.reasonRequestExtension = data.reasonRequestExtension;
  }

  ngOnInit() {
    this.createForm();
    // console.log('load data to dialog' + this.dueDate + '| ' + this.dueDateRequest + '| ' + this.reasonRequestExtension);
  }
  createForm() {
      this.form = this.fb.group({
        dueDateRequest: this.dueDateRequest,
        reasonRequestExtension: this.reasonRequestExtension
     });
  }
  onSave() {
    // debugger;
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }
}
