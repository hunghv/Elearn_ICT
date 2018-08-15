import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, AbstractControl, Validators } from '@angular/forms';
import { AssurancePlan } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { AssurancePlanService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogHelperService } from '../../../../shared/services/dialog-helper/dialog-helper.service';
import { AppError } from '../../../../shared/services/data-service/app-error';
import { Http } from '@angular/http';
import { NotFoundError } from '../../../../shared/services/data-service/not-found-error';
import { LocationService } from '../../../../shared/services/IAP/master-data/location.service';
import { AssuranceTypeService } from '../../../../shared/services/IAP/master-data/assurance-type.service';
import { AssuranceLineService } from '../../../../shared/services/IAP/master-data/assurance-line.service';
import { RiskAreaService } from '../../../../shared/services/IAP/master-data/risk-area.service';
import { HelperModule } from '../../../../shared/helper/helper.module';
import { CheckListFcService } from '../../../../shared/services/IAP/master-data/check-list.service';
import { EnterpriseService } from '../../../../shared/services/IAP/master-data/assessee.service.';
import { UserInformation } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/authentication/auth.service';
import { MessageConstant } from '../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-assurance-plan-dialog',
  templateUrl: './assurance-plan-dialog.component.html',
  styleUrls: ['./assurance-plan-dialog.component.scss'],
})

export class AssurancePlanDialogComponent implements OnInit {
  message = MessageConstant;
  frequency: any[];
  form: FormGroup;
  assuranceId: string;
  assurance: AssurancePlan = new AssurancePlan();
  isEdit = false;
  isSecondLine = false;
  isAssuranceTypeFc = true;
  lstLocation;
  lstAssuranceType;
  lstAssuranceLine;
  lstAssessee;
  lstRiskArea;
  lstChecklist;
  userInformation: UserInformation;

  ngOnInit() {
    this.loadForm();
  }

  constructor(
    private assuranceService: AssurancePlanService,
    public fb: FormBuilder,
    private dialogHelper: DialogHelperService,
    private locationService: LocationService,
    private assuranceTypeService: AssuranceTypeService,
    private assuranceLineService: AssuranceLineService,
    private riskAreaService: RiskAreaService,
    private checkListFcService: CheckListFcService,

    private assesseeService: EnterpriseService,
    private authService: AuthService,
    // private riskAreaService: RiskAreaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssurancePlanDialogComponent>) {
    if (data) {
      this.assuranceId = data.assuranceId || null;
      this.isEdit = data.isEdit || false;
    }

    this.userInformation = this.authService.getUserInformation();
    this.locationService.getAll()
      .subscribe(res => { this.lstLocation = res.items; console.log(res); });
    this.assuranceTypeService.getAll()
      .subscribe(res => { this.lstAssuranceType = res.items; console.log(res.items); });
    this.assuranceLineService.getAll()
      .subscribe(res => { this.lstAssuranceLine = res.items; console.log(res.items); });
    this.riskAreaService.getAll()
      .subscribe(res => { this.lstRiskArea = res.items; console.log(res.items); });
    this.assesseeService.getAllByType("OPU")
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

  onSubmit() {

    var obj: AssurancePlan = this.form.value;
    obj.isSecondLine = this.isSecondLine;
    // if action is edit
    if (this.isEdit) {
      this.assuranceService.update(obj)
        .subscribe(res => {
          this.dialogRef.close(res);
        },
      );
    } else {
      if (this.form.valid) {
        this.assuranceService.create(obj)
          .subscribe(res => {
            this.dialogHelper.showSuccess('Create Assurance Plan Successfully')
            // pass data to list ap to render new resource with out call api
            this.dialogRef.close(res);
          },
            (error: AppError) => {
              // handle expected error;
              if (error instanceof NotFoundError) {
                this.dialogHelper.showError('This assurance doesnt exist');
              } else {
                // or just log error message from server
                this.dialogHelper.showError(error.originalError.exceptionMessage);
              }
            });
      }
    }
  }

  loadForm() {
    let id: string = null;
    if (this.isEdit) {
      id = this.assuranceId;
      // this.checkListFcService.getAllByParentId(this.assurance.mdRiskAreaId).subscribe(res =>
      //   this.lstChecklist = res
      // );
    }
    else {
      id = HelperModule.newGuid();
    }

    this.form = this.fb.group({
      id: id,
      referenceNumber: '<system auto populate on save>',
      status: '<system auto populate on save>',
      title: ['', Validators.required],
      category: ['', Validators.required],
      month: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      checkList: ['', Validators.required],
      mdAssuranceLineId: ['', Validators.required],
      mdLocationId: ['', Validators.required],
      mdAssuranceTypeId: ['', Validators.required],
      mdRiskAreaId: ['', Validators.required],
      year: '',
      description: '',
      subType: '',
      scope: '',
      proposedAgenda: '',
      mdEnterpriseId: '',
      leadAssessor: '',
      teamLead: '',
      is2ndLine: false
    });

    if (this.isEdit) {
      this.assuranceService.getById(this.assuranceId).subscribe(
        res => {
          this.assurance = res;

          this.form.patchValue({
            id: this.assurance.id,
            referenceNumber: this.assurance.referenceNumber,
            status: this.assurance.status,
            title: this.assurance.title,
            description: this.assurance.description,
            category: this.assurance.category,
            subType: this.assurance.subType,
            month: this.assurance.month.toString(),
            // year: this.assurance.year.toString(),
            startDate: this.assurance.startDate,
            endDate: this.assurance.endDate,
            checkList: this.assurance.checkList,
            scope: this.assurance.scope,
            proposedAgenda: this.assurance.proposedAgenda,

            mdAssuranceLineId: this.assurance.mdAssuranceLineId,
            mdLocationId: this.assurance.mdLocationId,
            mdAssuranceTypeId: this.assurance.mdAssuranceTypeId,
            mdRiskAreaId: this.assurance.mdRiskAreaId,

            //line2
            mdEnterpriseId: this.assurance.mdEnterpriseId,
            leadAssessor: this.assurance.leadAssessor,
            teamLead: this.assurance.teamLead,
          });
          console.log(this.assurance);
        }
      );
    }
  }

  // var isLine2 = true;
  onLineChange(event) {
    if (event.source.value === '') {
      this.isSecondLine = true;
      return;
    }
    let assuranceLineName: string;
    for (let i = 0; i < this.lstAssuranceLine.length; i++) {
      if (this.lstAssuranceLine[i].id === event.source.value) {
        assuranceLineName = this.lstAssuranceLine[i].name;
        if (assuranceLineName === 'First Line') {
          this.isSecondLine = false;
          this.form.patchValue({ category: 'Planed' });
          this.showform2ndLine(this.isSecondLine);
          return;
        }
        if (assuranceLineName == 'Second Line') {
          this.isSecondLine = true;
          this.showform2ndLine(this.isSecondLine);
          return;
        } else {
          this.isSecondLine = false;
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
    if (event.source.value == "") {
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

  showform2ndLine(isLine2) {
  }
}
