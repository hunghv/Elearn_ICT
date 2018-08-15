import { Component, OnInit } from '@angular/core';
import { LIST_MONTH } from '../../../shared/constants/common.constants';
import { AssuranceLineService } from '../../../shared/services/IAP/master-data/assurance-line.service';
import { MDAssuranceLine } from '../../../shared/models/IAP/master-data/assurance-line.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocationService } from '../../../shared/services/IAP/master-data/location.service';
import { MDLocation } from '../../../shared/models/IAP/master-data/location.model';
import { RiskAreaService } from '../../../shared/services/IAP/master-data/risk-area.service';
import { MDRiskArea } from '../../../shared/models/IAP/master-data/risk-area.model';
import { ActivatedRoute } from '@angular/router';
import { DeptAAPItemService } from '../../../shared/services/IAP/annual-assurance-plan/department-aap-item/dept-aap-item.service';
import { DeptAAPItem } from '../../../shared/models/IAP/annual-assurance-plan/departmentAAPItem.model';
import { CheckListFcService } from '../../../shared/services/IAP/master-data/check-list.service';
import { DialogHelperService } from '../../../shared/services/dialog-helper/dialog-helper.service';
import { MessageConstant } from '../../../shared/constants/message.constants';
import { BrowserLocationService } from '../../../shared/services/browser-location/browser-location.service';

@Component({
  selector: 'iap-dept-aap-item-detail',
  templateUrl: './dept-aap-item-detail.component.html',
  styleUrls: ['./dept-aap-item-detail.component.scss']
})
export class DeptAapItemDetailComponent implements OnInit {
  form;

  months: string[] = LIST_MONTH;
  monthlyFrequency: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  annualFrequency = 0;
  quarterlyFrequency: number[] = [0, 0, 0, 0];

  deptAAPItem: DeptAAPItem;
  message = MessageConstant;
  lstAssuranceLine: MDAssuranceLine[];
  lstLocation: MDLocation[];
  lstRiskArea: MDRiskArea[];
  // lstChecklist: 
  constructor(
    private assuranceLineService: AssuranceLineService,
    private locationService: LocationService,
    private riskAreaService: RiskAreaService,
    private route: ActivatedRoute,
    private checkListFcService: CheckListFcService,
    private deptAAPItemService: DeptAAPItemService,
    private dialog: DialogHelperService,
    public location: BrowserLocationService,
    private fb: FormBuilder
  ) {
    this.deptAAPItem = new DeptAAPItem
  }

  ngOnInit() {
    this.form = this.fb.group({
      deptAAPItem: this.deptAAPItem,
      title: ['', Validators.required],
      description: ['', Validators.required], 
      riskAreaId: ['', Validators.required],
      assuranceTypeId:  ['', Validators.required], 
      locationId:  ['', Validators.required], 
      checklistId:  ['', Validators.required], 
      numberOfPlan:  [this.deptAAPItem.numberOfPlan, [Validators.required, this.onValidationNumOfPlan.bind(this)]], 
    });
    this.getAAPItem();
    //this.getMasterData();
    // this.loadForm();
  }

  getAAPItem() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      this.deptAAPItemService.getById(id).subscribe(res => {
        this.deptAAPItem = res
        //this.getChecklistFC(res.riskAreaId)
        if (this.deptAAPItem.planedAssurance.length > 0)
          this.monthlyFrequency = this.deptAAPItem.planedAssurance
        else this.monthlyFrequency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        this.loadForm();
        this.onPlanChange(null);
      }
      );
    })
  }

  loadForm() {
    this.form = this.fb.group({
      deptAAPItem: this.deptAAPItem,
      title: [this.deptAAPItem.title, Validators.required],
      description: [this.deptAAPItem.description,Validators.required],
      riskAreaId: [this.deptAAPItem.riskAreaId,Validators.required],
      assuranceTypeId: [this.deptAAPItem.assuranceTypeId,Validators.required],
      locationId: [this.deptAAPItem.locationId,Validators.required],
      checklistId: [this.deptAAPItem.checklistId,Validators.required],
      numberOfPlan: [this.deptAAPItem.numberOfPlan,[Validators.required, this.onValidationNumOfPlan.bind(this)]],
    });

  }

  onValidationNumOfPlan(control : FormControl){
    if(control.value < this.deptAAPItem.opuRequirement){
      return {
        numOfPlanValidate : { invalid: true}
      }
    }
    return null;
}

  onRiskAreaChange(event) {
    // Get check list based on risk area
    // this.getChecklistFC(event.source.value)
    this.checkListFcService
    .apgetAllByParentId(event.source.value, this.form.controls.mdAssuranceTypeId.value)
    .subscribe(res =>
      this.deptAAPItem.checklists = res
    );
  }

  onPlanChange($event) {
    let total = 0;
    let value = 0;
    this.quarterlyFrequency = [0, 0, 0, 0];

    this.monthlyFrequency.slice(0, 3).forEach(t => {
      value = Number(t)
      this.quarterlyFrequency[0] += value
      total += value
    });

    this.monthlyFrequency.slice(3, 6).forEach(t => {
      value = Number(t)
      this.quarterlyFrequency[1] += value
      total += value
    });

    this.monthlyFrequency.slice(6, 9).forEach(t => {
      value = Number(t)
      this.quarterlyFrequency[2] += value;
      total += value
    });

    this.monthlyFrequency.slice(9, 12).forEach(t => {
      value = Number(t)
      this.quarterlyFrequency[3] += value;
      total += value;
    });

    this.annualFrequency = total;

  }

  trackPlanByIndex(index: number, value: number) {
    return index;
  }

  // getChecklistFC(riskAreaId) {
  //   this.checkListFcService.getAllByParentId(riskAreaId).subscribe(res =>
  //     this.deptAAPItem.checklists = res
  //   );
  // }
  onAssuranceTypeChange(event) {
    this.checkListFcService
    .apgetAllByParentId(this.form.controls.mdRiskAreaId.value, event.source.value)
    .subscribe(res =>
      this.deptAAPItem.checklists = res
    );
  }
  save() {
    if (this.form.invalid || this.isNumberOfPlanInvalid() || this.isAssurancePlanedInvalid()) return;

    this.deptAAPItem.title = this.form.value.title
    this.deptAAPItem.description = this.form.value.description
    this.deptAAPItem.riskAreaId = this.form.value.riskAreaId
    this.deptAAPItem.assuranceTypeId = this.form.value.assuranceTypeId
    this.deptAAPItem.locationId = this.form.value.locationId
    this.deptAAPItem.assuranceTypeId = this.form.value.assuranceTypeId
    this.deptAAPItem.checklistId = this.form.value.checklistId
    this.deptAAPItem.numberOfPlan = this.form.value.numberOfPlan

    this.updatePlanedAssuranceBeforeSave()

    this.deptAAPItemService.update(this.deptAAPItem).subscribe(res =>
      {
        this.deptAAPItem.status = res.status
        this.dialog.showSuccess('Save successfully')
      }
    );
  }

  updatePlanedAssuranceBeforeSave() {
    this.deptAAPItem.planedAssurance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i < this.monthlyFrequency.length; i++) {
      this.deptAAPItem.planedAssurance[i] = Number(this.monthlyFrequency[i])
    }
  }

  isQuarterMetMinimum(frequency: number, quarter: number) {
    return this.quarterlyFrequency[quarter] == this.form.value.numberOfPlan
  }

  isAnnualMetMinimum(frequency: number) {
    return this.annualFrequency == this.form.value.numberOfPlan;
  }

  isFrequencyYearly() {
    return this.deptAAPItem.frequency == 'year'
  }

  isNumberOfPlanInvalid(){
    return this.deptAAPItem.opuRequirement > Number(this.form.value.numberOfPlan)
  }

  isAssurancePlanedInvalid(){
    let nValid = 0
    this.quarterlyFrequency.forEach(q => nValid += q == this.form.value.numberOfPlan ? 1 : 0)

    return nValid < this.quarterlyFrequency.length || (this.isFrequencyYearly() && this.annualFrequency != this.form.value.numberOfPlan);
  }
}
