import { Component, OnInit, Inject } from '@angular/core';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionDialogComponent } from '../../../findings-item-detail/list-action-item/action-dialog/action-dialog.component';
import {
  FindingService
} from '../../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/checklist-service/finding-service/finding.service';
import { Finding } from '../../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/finding.model';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { AppError } from '../../../../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../../../../shared/services/data-service/not-found-error';
import { ParentFindingType } from '../../../../../../shared/constants/common.constants';
import { MasterDataUrlConstants } from '../../../../../../shared/constants/url.constants';
import { debug } from 'util';

@Component({
  selector: 'iap-findings-dialog',
  templateUrl: './findings-dialog.component.html',
  styleUrls: ['./findings-dialog.component.scss']
})
export class FindingsDialogComponent implements OnInit {
  message = MessageConstant;
  mdConstants = MasterDataUrlConstants;
  parentFindingTypeConstants = ParentFindingType;
  finding: Finding;
  form: FormGroup;
  parentId = '';
  typeOfFinding = 'gap';
  parentFindingType = '';

  shareToLocationData: any;
  listAttachmentId: any[] = [];
  riskAreaData: any;
  checklistData: any;
  elementData: any;
  subElementData: any;
  riskAreaId: any;
  chkListId: any;
  elementId: any;
  isShowErrorAttachment = false;

  constructor(
    public fb: FormBuilder,
    public findingService: FindingService,
    private dialogHelper: DialogHelperService,
    private dialogRef: MatDialogRef<FindingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      debugger;
      this.finding = data.finding || null;
      this.parentId = data.parentId || '';
      this.parentFindingType = data.parentFindingType;
    }
  }

  ngOnInit() {
    this.loadForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    // if (this.form.valid) {
    this.findingService.create(this.form.value)
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
    // }
  }

  loadForm() {
    this.form = this.fb.group({
      id: this.newGuid(),
      description: ['', Validators.required],
      parentId: this.parentId,
      findingType: '',
      classification: ['', Validators.required],
      recommendation: '',
      shareToOtherLocation: '',
      riskAreaId: '',
      mdmscId: '',
      mdmscElementId: '',
      mdmscSubElementId: '',
      parentFindingType: this.parentFindingType,
      listAttachmentId: []
    });

    if (this.data.finding) {
      this.form.patchValue({
        id: this.finding.id,
        description: this.finding.description,
      });

    }

    if (this.parentFindingType === this.parentFindingTypeConstants.FcCheckList) {
      this.form.controls.classification.clearValidators();
    }

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

  onRiskAreaChangeChange(data) {
    this.riskAreaId = data.value;
  }
  onCheckListChange(data) {
    this.chkListId = data.value;
  }
  onElementChange(data) {
    this.elementId = data.value;
  }

  onFindingTypeChange(data) {
    if (data.value !== 'gap') {
      this.form.controls.classification.clearValidators();
    } else {
      this.form.controls.classification.setValidators(Validators.required);
    }
  }

}
