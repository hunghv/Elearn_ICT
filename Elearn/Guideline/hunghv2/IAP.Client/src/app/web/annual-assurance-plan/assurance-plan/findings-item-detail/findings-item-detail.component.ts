import { Component, OnInit } from '@angular/core';
import { FindingService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/checklist-service/finding-service/finding.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Finding } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/finding/finding.model';
import { ParentFindingType } from '../../../../shared/constants/common.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterDataUrlConstants } from '../../../../shared/constants/url.constants';
import { FindingsDialogComponent } from '../checklist-detail/list-findings-item/findings-dialog/findings-dialog.component';
import { BrowserLocationService } from '../../../../shared/services/browser-location/browser-location.service';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-findings-item-detail',
  templateUrl: './findings-item-detail.component.html',
  styleUrls: ['./findings-item-detail.component.scss']
})
export class FindingsItemDetailComponent implements OnInit {
  itemId: any;
  findingDetail: Finding;
  form: FormGroup;
  typeOfFinding: any;
  message = MessageConstant;
  parentFindingType = ParentFindingType;
  mdConstants = MasterDataUrlConstants;
  parentType = '';
  listAttachmentId = [];
  shareToLocationData: any;
  riskAreaData: any;
  checklistData: any;
  elementData: any;
  subElementData: any;
  riskAreaId: any;
  chkListId: any;
  elementId: any;

  constructor(
    public fb: FormBuilder,
    private apService: FindingService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public findingService: FindingService,
    public location: BrowserLocationService,
    public dialogHelper: DialogHelperService
  ) {
    this.route.params.subscribe(params => {
      this.itemId = params.id;
    });
  }

  ngOnInit() {
    this.createForm()
    //Get finding by Id
    this.loadFindingById();
  }

  loadFindingById() {
    this.apService.getById(this.itemId).subscribe(res => {
      this.findingDetail = res;
      this.parentType = res.checklistType;
      if (res.attachments != null && res.attachments.length > 0) {
        this.listAttachmentId = res.attachments.map(o => {
          return o.id;
        });
      }
      this.updateForm(res);
    });
  }

  handleBeforeUpload(postData) {
    debugger;
    if (typeof postData.append === 'function') {
      postData.append('referenceId', this.itemId);
    }
    else {
      postData.referenceId = this.itemId;
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

  onSubmit() {
    this.findingService.update(this.form.value)
      .subscribe(res => {
        if (res) {
          this.dialogHelper.showSuccess(this.message.MESSAGE_UPDATE_SUCCESSFULLY); 
          this.updateForm(res);
        } else {
          this.dialogHelper.showError(this.message.MESSAGE_UPDATE_SUCCESSFULLY);
        }
      },
    );
  }

  updateForm(item: Finding) {
    this.form = this.fb.group({
      id: item.id,
      description: item.description,
      parentid: item.parentId,
      findingType: item.findingType,
      classification: item.classification,
      recommendation: item.recommendation,
      shareToOtherLocation: item.shareToOtherLocation,
      riskAreaId: item.riskAreaId,
      mdmscId: item.mdmscId,
      mdmscElementId: item.mdmscElementId,
      mdmscSubElementId: item.mdmscSubElementId,
      parentFindingType: item.parentFindingType
    });
    //Load Dropdownlist  Radio
    this.typeOfFinding = item.findingType;
    this.onRiskAreaChangeChange({ value: item.riskAreaId });
    this.onCheckListChange({ value: item.mdmscId });
    this.onElementChange({ value: item.mdmscElementId });
  }

  createForm() {
    this.form = this.fb.group({
      id: '',
      description: '',
      parentid: '',
      findingType: '',
      classification: '',
      recommendation: '',
      shareToOtherLocation: '',
      riskAreaId: '',
      mdmscId: '',
      mdmscElementId: '',
      mdmscSubElementId: '',
      parentFindingType: ''
    });
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
}
