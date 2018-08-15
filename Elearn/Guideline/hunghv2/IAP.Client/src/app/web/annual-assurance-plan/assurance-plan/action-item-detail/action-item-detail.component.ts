import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActionItemService } from '../../../../shared/services/IAP/action-item/action-item.service';
import { ActivatedRoute } from '@angular/router';
import { ActionItemModel, DueDateRequestExtension } from '../../../../shared/models/IAP/action-item/action-item.model';
import { BrowserLocationService } from '../../../../shared/services/browser-location/browser-location.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageConstant } from '../../../../shared/constants/message.constants';
import { MasterDataUrlConstants } from '../../../../shared/constants/url.constants';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { RequestDueDateDialogComponent } from './request-due-date-dialog/request-due-date-dialog.component';
import { UserControlInfo } from '../../../../shared/models/common.model';
import { PeoplePickerComponent } from '../../../../shared/components/common/people-picker/people-picker.component';
@Component({
  selector: 'iap-action-item-detail',
  templateUrl: './action-item-detail.component.html',
  styleUrls: ['./action-item-detail.component.scss']
})
export class ActionItemDetailComponent implements OnInit {

  // dueDateRequestExtensionObj: DueDateRequestExtension;
  action: ActionItemModel;
  listAttachmentId = [];
  actionForm: FormGroup;
  description: FormControl;
  priority: FormControl;
  dueDate: FormControl;
  completionStatus: FormControl;
  actionPartyId: FormControl;
  actionVerifierId: FormControl;
  completionDate: any;
  requestDueDateExtension: any;
  reasonRequestDueDateExtension;
  dueDateObj: any;
  message = MessageConstant;
  mdUrl = MasterDataUrlConstants;
  priorityData: any[] = [];
  @ViewChild('ppActionParty') ppActionParty: PeoplePickerComponent;
  @ViewChild('ppActionVerifier') ppActionVerifier: PeoplePickerComponent;

  constructor(private dialog: MatDialog,
    private service: ActionItemService,
    private route: ActivatedRoute,
    public location: BrowserLocationService,
    public dialogHelper: DialogHelperService
  ) {
    this.action = new ActionItemModel();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.action.id = params.id;
      this.getActionItem();
    });
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.description = new FormControl('', Validators.required);
    this.priority = new FormControl('', Validators.required);
    this.dueDate = new FormControl('', Validators.required);
    this.completionStatus = new FormControl('', Validators.required);
    this.actionPartyId = new FormControl;//new FormControl('', Validators.required);
    this.actionVerifierId = new FormControl;//new FormControl('', Validators.required);
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

  requestExtension() {
    this.dialog.open(RequestDueDateDialogComponent, {
      width: '1000px',
      maxWidth: '80vw',
      maxHeight: '90vh',
      position: {
        top: '50px'
      },
      data: {
        dueDate: this.dueDateObj,
        reasonRequestExtension: this.reasonRequestDueDateExtension,
        dueDateRequestExtension: this.requestDueDateExtension
      }
    })
      .afterClosed().subscribe(res => {
        console.log(res);
        this.reasonRequestDueDateExtension = res.reasonRequestExtension;
        this.requestDueDateExtension = res.dueDateRequest;
      });
  }

  getActionItem() {
    if (this.action.id) {
      this.service.getById(this.action.id).subscribe(data => {
        debugger;
        this.action = data;
        this.actionForm.setValue({
          description: data.description,
          priority: data.priorityId,
          dueDate: data.dueDate,
          completionStatus: data.completionStatus,
          actionPartyId: data.actionPartyId,
          actionVerifierId: data.actionVerifierId
        });
        this.completionDate = data.completionDate;
        this.requestDueDateExtension = data.requestDueDateExtension;
        console.log(this.requestDueDateExtension);
        this.reasonRequestDueDateExtension = data.reasonRequestDueDateExtension;
        console.log(this.reasonRequestDueDateExtension);
        this.dueDateObj = data.dueDate;
        if (data.attachments != null && data.attachments.length > 0) {
          this.listAttachmentId = data.attachments.map(o => {
            return o.id;
          });
        }
      });
    }
  }

  handleBeforeUpload(postData) {
    if (typeof postData.append === 'function') {
      postData.append('referenceId', this.action.id);
    } else {
      postData.referenceId = this.action.id;
    }
  }

  handleAfterUpload(uploadedId) {
    this.listAttachmentId.push(uploadedId);
    this.listAttachmentId = [...this.listAttachmentId];
  }

  handleAfterDelete(deletedId) {
    this.listAttachmentId = this.listAttachmentId.filter(id => {
      return id !== deletedId;
    });
  }

  updateActionItem() {
    //Show error for  actionPartyId & actionVerifierId
    if (this.actionForm.controls.actionPartyId.invalid) {
      this.ppActionParty.hasError = true;
    }
    if (this.actionForm.controls.actionVerifierId.invalid) {
      this.ppActionVerifier.hasError = true;
    }

    if (this.actionForm.valid) {
      const formValue = this.actionForm.value;
      debugger;
      const actionModel = {
        id: this.action.id,
        description: formValue.description,
        priority: formValue.priority,
        dueDate: formValue.dueDate,
        completionStatus: formValue.completionStatus,
        completionDate: this.completionDate,
        actionPartyId: formValue.actionPartyId,
        actionVerifierId: formValue.actionVerifierId,
        listAttachment: this.listAttachmentId,
        reasonRequestDueDateExtension: this.reasonRequestDueDateExtension,
        requestDueDateExtension: this.requestDueDateExtension
      };
      this.service.update(actionModel).subscribe(res => {
        console.log(res);
        if (res) {
          this.dialogHelper.showSuccess(this.message.MESSAGE_UPDATE_SUCCESSFULLY);
          this.getActionItem();
        } else {
          this.dialogHelper.showError(this.message.MESSAGE_UPDATE_SUCCESSFULLY);
        }
      });
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
