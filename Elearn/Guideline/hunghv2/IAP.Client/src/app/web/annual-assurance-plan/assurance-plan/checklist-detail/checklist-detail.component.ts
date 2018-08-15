import { Component, OnInit } from '@angular/core';
import { ParentFindingType } from '../../../../shared/constants/common.constants';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BrowserLocationService } from '../../../../shared/services/browser-location/browser-location.service';
import { ChecklistItem } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/checklist/checklist-item.model';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../../shared/constants/message.constants';
import { ChecklistItemService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/checklist-service/checklist-item.service';

@Component({
  selector: 'iap-checklist-detail',
  templateUrl: './checklist-detail.component.html',
  styleUrls: ['./checklist-detail.component.scss']
})
export class ChecklistDetailComponent implements OnInit {

  assuranceType: string;

  fcForm: FormGroup;
  msForm: FormGroup;
  isFC = true;
  checklistId;
  checklistItem: ChecklistItem;
  parentFindingType = ParentFindingType.FcCheckList;
  message = MessageConstant;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialogHelper: DialogHelperService,
    public location: BrowserLocationService,
    private checklistService: ChecklistItemService
  ) { }

  ngOnInit() {

    this.getChecklist();
    this.loadFcForm(null);
    this.loadMsForm(null);
  }
  getChecklist() {
    this.route.paramMap.subscribe(params => {
      this.checklistId = params.get('id');
      this.assuranceType = params.get('type');
      this.isFC = this.assuranceType !== 'Management System';

      if (!this.isFC) {
        // get with checklist type FC
        this.checklistService.getByIdTypeMS(this.checklistId)
          .subscribe(res => {
            this.checklistItem = res;
            // debugger;
            this.loadMsForm(res);
          });
        this.parentFindingType = ParentFindingType.MsChecklist;
      }else {
        // get with checklist type MS
        this.checklistService.getByIdTypeFC(this.checklistId)
          .subscribe(res => {
            this.checklistItem = res;
            // debugger;
            this.loadFcForm(res);
          });
      }

    });
  }
  loadFcForm(data) {
    this.fcForm = this.fb.group({
      id: this.checklistId,
      compliance: ['', Validators.required],
      type: '',
      remarks: '',
    });
    if (data) {
      this.fcForm.patchValue({
        id: this.checklistId,
        compliance: data.compliance,
        remarks: data.remarks,
        type: this.assuranceType
      });
    }
  }
  loadMsForm(data) {
    this.msForm = this.fb.group({
      id: this.checklistId,
      overallAssessmentRating: ['', Validators.required],
      level: ['', Validators.required],
      remarks: '',
      fcPerformance: 'Good',
    });
    if (data) {
      this.msForm.patchValue({
        id: this.checklistId,
        overallAssessmentRating: data.overallAssessmentRating,
        level: data.level,
        fcPerformance: data.fcPerformance,
        remarks: data.remarks,
      });
    }
  }
  onSave() {
    if (this.isFC) {
      if (this.fcForm.invalid)
        return;

      this.checklistService.update(this.fcForm.value)
        .subscribe(res => this.dialogHelper.showSuccess('Save successfully'));
    }else {
      if (this.msForm.invalid)
        return;

      this.checklistService.update(this.msForm.value)
        .subscribe(res => this.dialogHelper.showSuccess('Save successfully'));
    }
  }

}
