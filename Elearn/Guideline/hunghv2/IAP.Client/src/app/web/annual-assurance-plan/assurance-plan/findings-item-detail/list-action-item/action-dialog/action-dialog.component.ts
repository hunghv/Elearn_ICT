import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActionItemService } from '../../../../../../shared/services/IAP/action-item/action-item.service';
import { DatePipe } from '@angular/common';
import { MasterDataUrlConstants } from '../../../../../../shared/constants/url.constants';
import { PeoplePickerComponent } from '../../../../../../shared/components/common/people-picker/people-picker.component';
import { UserControlInfo } from '../../../../../../shared/models/common.model';

@Component({
  selector: 'iap-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {

  message = MessageConstant;
  mdUrl = MasterDataUrlConstants;
  actionForm: FormGroup;
  description: FormControl;
  priority: FormControl;
  dueDate: FormControl;
  completionStatus: FormControl;
  actionPartyId: FormControl;
  actionVerifierId: FormControl;
  completionDate: string;
  listAttachmentId: any[] = [];
  priorityData: any[] = [];
  @ViewChild('ppActionParty') ppActionParty: PeoplePickerComponent;
  @ViewChild('ppActionVerifier') ppActionVerifier: PeoplePickerComponent;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: ActionItemService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
    this.completionStatus.valueChanges.subscribe(() => {
      if (this.completionStatus.valid) {
        this.completionDate = this.datePipe.transform(Date.now(), 'dd MMM yyyy');
      } else {
        this.completionDate = '-';
      }
    });
  }

  createFormControl() {
    this.description = new FormControl('', Validators.required);
    this.priority = new FormControl('', Validators.required);
    this.dueDate = new FormControl('', Validators.required);
    this.completionStatus = new FormControl('', Validators.required);
    this.actionPartyId = new FormControl(); // new FormControl('', Validators.required);
    this.actionVerifierId = new FormControl(); // new FormControl('', Validators.required);
  }

  createForm() {
    this.actionForm = new FormGroup({
      description: this.description,
      priority: this.priority,
      dueDate: this.dueDate,
      completionStatus: this.completionStatus,
      actionPartyId: this.actionPartyId,
      actionVerifierId: this.actionVerifierId
    });
  }

  onSubmit() {

    //Show error for  actionPartyId & actionVerifierId
    if (this.actionForm.controls.actionPartyId.invalid) {
      this.ppActionParty.hasError = true;
    }
    if (this.actionForm.controls.actionVerifierId.invalid) {
      this.ppActionVerifier.hasError = true;
    }

    if (this.actionForm.valid) {
      const formValue = this.actionForm.value;
      const actionModel = {
        findingsId: this.data.findingsId,
        description: formValue.description,
        priority: formValue.priority,
        dueDate: formValue.dueDate,
        completionStatus: formValue.completionStatus,
        actionPartyId : formValue.actionPartyId,
        actionVerifierId : formValue.actionVerifierId,
        completionDate: new Date(),
        listAttachment: this.listAttachmentId
      };
      this.dataService.create(actionModel).subscribe(res => {
        this.dialogRef.close({ result: res });
      });
    }

  }

  handleAfterUpload(eventData) {
    this.listAttachmentId.push(eventData);
    this.listAttachmentId = [...this.listAttachmentId];
  }

  handleAfterDelete(deletedId) {
    this.listAttachmentId = this.listAttachmentId.filter(id => {
      return id !== deletedId;
    });
  }

  onCompletionStatusChange(data) {
    if (data.value === 'Open') {
      this.completionDate = '';
    }
  }

  handleSelectedUser(selectedUser: UserControlInfo) {
    if (selectedUser != null) {
      if (selectedUser.peoplePickerType === 'ActionParty') {
        this.actionForm.controls.actionPartyId.setValue(selectedUser.id);
      } else if (selectedUser.peoplePickerType === 'ActionItemVerifier') {
        this.actionForm.controls.actionVerifierId.setValue(selectedUser.id);
      }
    } else {
      if (selectedUser.peoplePickerType === 'ActionParty') {
        this.actionForm.controls.actionPartyId.setValue('');
      } else if (selectedUser.peoplePickerType === 'ActionItemVerifier') {
        this.actionForm.controls.actionVerifierId.setValue('');
      }
    }
  }
}
