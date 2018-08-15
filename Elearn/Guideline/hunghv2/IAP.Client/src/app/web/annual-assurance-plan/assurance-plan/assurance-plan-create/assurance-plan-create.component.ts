import { select } from '@angular-redux/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssurancePlan } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { UserInformation } from '../../../../shared/models/user.model';
import { AssurancePlanService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { LocationService } from '../../../../shared/services/IAP/master-data/location.service';
import { AssuranceTypeService } from '../../../../shared/services/IAP/master-data/assurance-type.service';
import { AssuranceLineService } from '../../../../shared/services/IAP/master-data/assurance-line.service';
import { RiskAreaService } from '../../../../shared/services/IAP/master-data/risk-area.service';
import { CheckListFcService } from '../../../../shared/services/IAP/master-data/check-list.service';
import { EnterpriseService } from '../../../../shared/services/IAP/master-data/assessee.service.';
import { AuthService } from '../../../../shared/services/authentication/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppError } from '../../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../../shared/services/data-service/not-found-error';
import { HelperModule } from '../../../../shared/helper/helper.module';
import { Router } from '@angular/router';
import { MessageConstant } from '../../../../shared/constants/message.constants';
import { BrowserLocationService } from '../../../../shared/services/browser-location/browser-location.service';
import { UserControlInfo } from '../../../../shared/models/common.model';
import { PeoplePickerComponent } from '../../../../shared/components/common/people-picker/people-picker.component';


@Component({
  selector: 'iap-assurance-plan-create',
  templateUrl: './assurance-plan-create.component.html',
  styleUrls: ['./assurance-plan-create.component.scss'],
})
export class AssurancePlanCreateComponent implements OnInit {
  minDate: Date;
  maxDate: any;
  message = MessageConstant;
  frequency: any[];
  form: FormGroup;
  assuranceId: string;
  assurance: AssurancePlan = new AssurancePlan();
  isSecondLine = false;
  isFirstLine = false;
  isAssuranceTypeFc = true;
  lstLocation;
  lstDepartments;
  lstAssuranceType;
  lstAssuranceLine;
  lstAssessee;
  lstRiskArea;
  lstChecklist;
  isSubmitter = true;
  userInformation: UserInformation;
  leadAssessor = new UserControlInfo();
  teamLead = new UserControlInfo();
  @ViewChild('ppLeadAssessor') ppLeadAssessor: PeoplePickerComponent;
  @ViewChild('ppTeamLead') ppTeamLead: PeoplePickerComponent;

  ngOnInit() {
    this.loadForm();
  }

  constructor(
    private assuranceService: AssurancePlanService,
    public fb: FormBuilder,
    private router: Router,
    private dialogHelper: DialogHelperService,
    private locationService: LocationService,
    private assuranceTypeService: AssuranceTypeService,
    private assuranceLineService: AssuranceLineService,
    private riskAreaService: RiskAreaService,
    private checkListFcService: CheckListFcService,
    private assesseeService: EnterpriseService,
    private authService: AuthService,
    public location: BrowserLocationService) {

    this.userInformation = this.authService.getUserInformation();
    this.locationService.getAll()
      .subscribe(res => { this.lstLocation = res.items; console.log(res); });

    this.locationService.getByType({
      type: 'Department'
    })
      .subscribe(res => { this.lstDepartments = res; });

    this.assuranceTypeService.getAll()
      .subscribe(res => { this.lstAssuranceType = res.items; console.log(res.items); });
    this.assuranceLineService.getAll()
      .subscribe(res => { this.lstAssuranceLine = res.items; console.log(res.items); });
    this.riskAreaService.getAll()
      .subscribe(res => { this.lstRiskArea = res.items; console.log(res.items); });
    this.assesseeService.getAllByType('OPU')
      .subscribe(res => { this.lstAssessee = res; console.log(res); });

    this.frequency = [
      { month: 'JAN', planned: '' },
      { month: 'FEB', planned: '' },
      { month: 'MAR', planned: '' },
      { month: 'APR', planned: '' },
      { month: 'MAY', planned: '' },
      { month: 'JUN', planned: '' },
      { month: 'JUL', planned: '' },
      { month: 'AUG', planned: '' },
      { month: 'SEP', planned: '' },
      { month: 'OCT', planned: '' },
      { month: 'NOV', planned: '' },
      { month: 'DEC', planned: '' },
    ];
  }

  onRiskAreaChange(event) {
    // Get check list based on risk area
    this.checkListFcService
      .apgetAllByParentId(event.source.value, this.form.controls.mdAssuranceTypeId.value)
      .subscribe(res =>
        this.lstChecklist = res
      );
  }

  onSave() {

    //reset validators
    this.form.clearValidators()
    //common validation
    this.form.controls.mdAssuranceLineId.setValidators(Validators.required);
    this.form.controls.category.setValidators(Validators.required);
    this.form.controls.month.setValidators(Validators.required);
    this.form.controls.mdLocationId.setValidators(Validators.required);
    this.form.controls.startDate.setValidators(Validators.required);
    this.form.controls.endDate.setValidators(Validators.required);

    //Update   
    this.form.controls.mdEnterpriseId.updateValueAndValidity();
    this.form.controls.category.updateValueAndValidity();
    this.form.controls.month.updateValueAndValidity();
    this.form.controls.mdLocationId.updateValueAndValidity();
    this.form.controls.startDate.updateValueAndValidity();
    this.form.controls.endDate.updateValueAndValidity();

    if (this.isFirstLine) {
      //Set
      this.form.controls.title.setValidators(Validators.required);
      this.form.controls.mdAssuranceTypeId.setValidators(Validators.required);
      this.form.controls.mdRiskAreaId.setValidators(Validators.required);
      this.form.controls.checkList.setValidators(Validators.required);
      this.form.controls.mdDepartmentId.setValidators(Validators.required);

      //Update   
      this.form.controls.mdEnterpriseId.updateValueAndValidity();
      this.form.controls.category.updateValueAndValidity();
      this.form.controls.month.updateValueAndValidity();
      this.form.controls.mdLocationId.updateValueAndValidity();
      this.form.controls.startDate.updateValueAndValidity();
      this.form.controls.endDate.updateValueAndValidity();

      this.form.controls.title.updateValueAndValidity();
      this.form.controls.mdAssuranceTypeId.updateValueAndValidity();
      this.form.controls.mdRiskAreaId.updateValueAndValidity();
      this.form.controls.checkList.updateValueAndValidity();
      this.form.controls.mdDepartmentId.updateValueAndValidity();

      // MSCchecklist - type MS
      if (!this.isAssuranceTypeFc) {
        //set
        this.form.controls.scope.setValidators(Validators.required);
        this.form.controls.proposedAgenda.setValidators(Validators.required);
        //update
        this.form.controls.scope.updateValueAndValidity();
        this.form.controls.proposedAgenda.updateValueAndValidity();
      }
    }

    if (this.isSecondLine) {
      //Set
      this.form.controls.leadAssessor.setValidators(Validators.required);
      this.form.controls.teamLead.setValidators(Validators.required);
      this.form.controls.mdEnterpriseId.setValidators(Validators.required);

      //Update
      this.form.controls.leadAssessor.updateValueAndValidity();
      this.form.controls.teamLead.updateValueAndValidity();
      this.form.controls.mdEnterpriseId.updateValueAndValidity();

      //Show error for  leadAssessor & teamLead
      if (this.form.controls.leadAssessor.invalid) {
        this.ppLeadAssessor.hasError = true;
      }
      if (this.form.controls.teamLead.invalid) {
        this.ppTeamLead.hasError = true;
      }
    }
    if (this.form.invalid) {
      return;
    }

    const obj: AssurancePlan = this.form.value;
    obj.isSecondLine = this.isSecondLine;
    obj.isAssuranceTypeFc = this.isAssuranceTypeFc;
    obj.startDate = this.form.value.startDate;
    obj.endDate = this.form.value.endDate;

    this.assuranceService.create(obj)
      .subscribe(res => {
        this.dialogHelper.showSuccess('Create successfully!');
        this.router.navigateByUrl('/web/annual-assurance-plan/assurance-plan/' + obj.id);
        // pass data to list ap to render new resource with out call api
      },
        (error: AppError) => {
          // handle expected error;
          if (error instanceof NotFoundError) {
            this.dialogHelper.showError('Create unsuccessfully!');
          } else {
            // or just log error message from server
            this.dialogHelper.showError(error.originalError.exceptionMessage);
          }
        });
  }

  loadForm() {
    const id: string = HelperModule.newGuid();

    this.form = this.fb.group({
      id: id,
      referenceNumber: '<system auto populate on save>',
      status: '<system auto populate on save>',
      mdAssuranceLineId: '',
      category: '',
      title: '',
      month: '',
      mdLocationId: '',
      startDate: '',
      endDate: '',
      mdAssuranceTypeId: '',
      mdRiskAreaId: '',
      checkList: '',
      mdDepartmentId: '',
      leadAssessor: '',
      teamLead: '',
      scope: '',
      proposedAgenda: '',
      mdEnterpriseId: '',
      subType: '',
      description: '',
      year: '',

      is2ndLine: false
    });
  }

  // var isLine2 = true;
  onLineChange(event) {
    if (!event.source.value) {
      this.isSecondLine = true;
      return;
    }
    let assuranceLineName: string;
    for (let i = 0; i < this.lstAssuranceLine.length; i++) {
      if (this.lstAssuranceLine[i].id === event.source.value) {
        assuranceLineName = this.lstAssuranceLine[i].name;
        if (assuranceLineName === 'First Line') {
          this.isSecondLine = false;
          this.isFirstLine = true;
          this.form.patchValue({ category: 'Planed' });
          return;
        }
        if (assuranceLineName === 'Second Line') {
          this.isSecondLine = true;
          this.isFirstLine = false;
          return;
        } else {
          this.isSecondLine = false;
          this.isFirstLine = false;
          return;
        }
      }
    }
  }

  onAssuranceTypeChange(event) {
    this.checkListFcService
      .apgetAllByParentId(this.form.controls.mdRiskAreaId.value, event.source.value)
      .subscribe(res =>
        this.lstChecklist = res
      );

    if (event.source.value === '') {
      this.isSecondLine = true;
      return;
    }

    for (let i = 0; i < this.lstAssuranceType.length; i++) {
      if (this.lstAssuranceType[i].id === event.source.value) {
        this.isAssuranceTypeFc = this.lstAssuranceType[i].name === 'Functional Checklist';
        return;
      }
    }
  }

  handleSelectedUser(selectedUser: UserControlInfo) {
    if (selectedUser != null) {
      if (selectedUser.peoplePickerType === 'LeadAssessor') {
        this.form.controls.leadAssessor.setValue(selectedUser.id);
        //this.form.patchValue({ leadAssessor: selectedUser.displayName });
      } else if (selectedUser.peoplePickerType === 'TeamLead') {
       // this.form.patchValue({ teamLead: selectedUser.displayName });
       this.form.controls.teamLead.setValue(selectedUser.id);
      }
    } else {
      if (selectedUser.peoplePickerType === 'LeadAssessor') {
       // this.form.patchValue({ leadAssessor: '' });
        this.form.controls.leadAssessor.setValue('');
       // this.form.controls.leadAssessor.setValidators(Validators.required);
      } else if (selectedUser.peoplePickerType === 'TeamLead') {
        //this.form.patchValue({ teamLead: '' });
        this.form.controls.teamLead.setValue('');
        //this.form.controls.teamLead.setValidators(Validators.required);
      }
    }
  }
  onChangeMonth() {
    const date = new Date(), y = date.getFullYear(), m = this.form.value.month;
    this.minDate = new Date(y, m - 1, 1);
    this.maxDate = new Date(y, m , 0);
  }
}
