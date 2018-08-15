import { Component, OnInit, Inject } from '@angular/core';
import { LIST_MONTH } from '../../../../shared/constants/common.constants';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeptAAPItemService } from '../../../../shared/services/IAP/annual-assurance-plan/department-aap-item/dept-aap-item.service';
import { DeptAAPItem } from '../../../../shared/models/IAP/annual-assurance-plan/departmentAAPItem.model';
import { CheckListFcService } from '../../../../shared/services/IAP/master-data/check-list.service';
import { MessageConstant } from '../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-create-aap-item-dialog',
  templateUrl: './create-aap-item-dialog.component.html',
  styleUrls: ['./create-aap-item-dialog.component.scss']
})
export class CreateAapItemDialogComponent implements OnInit {
  months: string[] = LIST_MONTH;
  monthlyFrequency: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  annualFrequency = 0;
  quarterlyFrequency: number[] = [0, 0, 0, 0];
  aapItem: DeptAAPItem
  deptAAPId;
  form;
  message = MessageConstant;
  numberOfPlanIsValid = false;

  constructor(
    private fb: FormBuilder,

    private dialogHelper: DialogHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateAapItemDialogComponent>,
    private checkListFcService: CheckListFcService,
    private deptAapItemService: DeptAAPItemService) {
    this.aapItem = new DeptAAPItem
    this.aapItem.planedAssurance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.aapItem.id = "00000000-0000-0000-0000-000000000000"
    this.aapItem.deptAAPId = data.deptAAPId
  }

  ngOnInit() {
    this.loadBlankForm()
    this.deptAapItemService.create(this.aapItem).subscribe(res => {
      this.aapItem = res
      this.loadBlankForm()
    }
    );
  }

  loadBlankForm() {
    // this.aapItem.opuRequirement = 8
    // this.aapItem.ptsRequirement = 5
    // this.aapItem.frequency = 'quarter'
    // this.aapItem.numberOfPlan = 8
    this.monthlyFrequency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.form = this.fb.group({
      aapItem: this.aapItem,

      title: ['', Validators.required],
      description: ['', Validators.required],
      riskAreaId: ['', Validators.required],
      assuranceTypeId: ['', Validators.required],
      locationId: ['', Validators.required],
      checklistId: ['', Validators.required],
      numberOfPlan: [this.aapItem.numberOfPlan, [Validators.required, this.onValidationNumOfPlan.bind(this)]],
    });

  }

  onValidationNumOfPlan(control: FormControl) {
    if (control.value < this.aapItem.opuRequirement) {
      return {
        numOfPlanValidate: { invalid: true }
      }
    }
    return null;
  }

  onPlanChange($event) {
    var total = 0;
    var value = 0;
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
      this.quarterlyFrequency[2] += value
      total += value
    });

    this.monthlyFrequency.slice(9, 12).forEach(t => {
      value = Number(t)
      this.quarterlyFrequency[3] += value
      total += value
    });

    this.annualFrequency = total;

  }

  trackPlanByIndex(index: number, value: number) {
    return index;
  }

  onRiskAreaChange(event) {
    // Get check list based on risk area
    // this.checkListFcService.getAllByParentId(event.source.value).subscribe(res =>
    //   this.aapItem.checklists = res
    // );
    debugger
    this.checkListFcService
    .apgetAllByParentId(event.source.value, this.form.controls.assuranceTypeId.value)
    .subscribe(res =>
      this.aapItem.checklists = res
    );

  }
  onAssuranceTypeChange(event) {
    this.checkListFcService
      .apgetAllByParentId(this.form.controls.riskAreaId.value, event.source.value)
      .subscribe(res =>
        this.aapItem.checklists = res
      );
    }
  updatePlanedAssuranceBeforeSave() {
    this.aapItem.planedAssurance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i < this.monthlyFrequency.length; i++) {
      this.aapItem.planedAssurance[i] = Number(this.monthlyFrequency[i])
    }
  }



  save() {

    if(this.isInFormValid())
    return;

    this.aapItem.title = this.form.value.title
    this.aapItem.description = this.form.value.description
    this.aapItem.riskAreaId = this.form.value.riskAreaId
    this.aapItem.assuranceTypeId = this.form.value.assuranceTypeId
    this.aapItem.locationId = this.form.value.locationId
    this.aapItem.assuranceTypeId = this.form.value.assuranceTypeId
    this.aapItem.checklistId = this.form.value.checklistId
    this.aapItem.numberOfPlan = this.form.value.numberOfPlan

    this.updatePlanedAssuranceBeforeSave()

    this.deptAapItemService.create(this.aapItem).subscribe(res => {
      this.dialogHelper.showSuccess('Save successfully')
      this.dialogRef.close(res)
    }
    );
  }

  isQuarterMetMinimum(frequency: number, quarter: number) {
    return this.quarterlyFrequency[quarter] == this.form.value.numberOfPlan
  }

  isAnnualMetMinimum(frequency: number) {
    return this.annualFrequency == this.form.value.numberOfPlan;
  }

  isFrequencyYearly() {
    return this.aapItem.frequency == 'year'
  }

  isNumberOfPlanInvalid() {
    return this.aapItem.opuRequirement > this.form.value.numberOfPlan
  }

  isAssurancePlanedInvalid() {
    let nValid = 0
    this.quarterlyFrequency.forEach(q => nValid += q == this.form.value.numberOfPlan ? 1 : 0)

    return nValid < this.quarterlyFrequency.length || (this.isFrequencyYearly() && this.annualFrequency != this.form.value.numberOfPlan);
  }

  isInFormValid()
  {
    this.numberOfPlanIsValid = false;
    if (this.form.invalid || this.isNumberOfPlanInvalid() || this.isAssurancePlanedInvalid()) {
      this.numberOfPlanIsValid = true;
      return this.numberOfPlanIsValid;
    }

    return  this.numberOfPlanIsValid;
  }
}
