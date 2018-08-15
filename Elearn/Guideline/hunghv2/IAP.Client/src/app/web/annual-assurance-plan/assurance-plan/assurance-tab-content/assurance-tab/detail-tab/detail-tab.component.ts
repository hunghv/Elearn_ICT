import { Component, OnInit, Input } from '@angular/core';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { AssurancePlanDialogComponent } from '../../../assurance-plan-dialog/assurance-plan-dialog.component';
import { MatDialog } from '@angular/material';
import { LIST_MONTH } from '../../../../../../shared/constants/common.constants';
import { AssurancePlan } from '../../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssurancePlanService } from '../../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperModule } from '../../../../../../shared/helper/helper.module';
import { AuthService } from '../../../../../../shared/services/authentication/auth.service';
import { UserInformation } from '../../../../../../shared/models/user.model';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';
import { UserControlInfo } from '../../../../../../shared/models/common.model';
import { LocationService } from '../../../../../../shared/services/IAP/master-data/location.service';
import { EnterpriseService } from '../../../../../../shared/services/IAP/master-data/assessee.service.';

@Component({
  selector: 'iap-detail-tab',
  templateUrl: './detail-tab.component.html',
  styleUrls: ['./detail-tab.component.scss']
})
export class DetailTabComponent implements OnInit {
  @Input() isSubmitter;
  message = MessageConstant;
  assurance: AssurancePlan = new AssurancePlan();
  months: string[] = LIST_MONTH;
  monthlyFrequency: number[] = [0, 0, 0, 2, 5, 7, 12, 5, 1, 0, 2, 8];
  annualFrequency = 1;
  quarterlyFrequency: number[] = [1, 2, 3, 4];
  scope: string;
  agenda: string;
  teamLead: UserControlInfo = new UserControlInfo();
  leadAssessor: UserControlInfo = new UserControlInfo();
  form: FormGroup;
  // assuranceLineEnum: EnumAssuranceLine;
  // assuranceTypeEnum: EnumAssuranceType;
  userInformation: UserInformation;
  teamLeadObj: UserControlInfo;
  leadAssessorObj: UserControlInfo;
  isFc: boolean;
  lstLocation;
  lstAssessee;

  constructor(private assuranceService: AssurancePlanService,
    private authService: AuthService,
    private locationService: LocationService,
    private assesseeService: EnterpriseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogHelper: DialogHelperService,
    private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      month: '',
      mdLocationId: '',
      startDate: '',
      endDate: '',
      mdEnterpriseId: '',
      scope: '',
      proposedAgenda: '',
      remark: '',
      teamLead: '',
      leadAssessor: '',
    });

    this.userInformation = this.authService.getUserInformation();
    this.locationService.getAll()
      .subscribe(res => { this.lstLocation = res.items; });

    this.assesseeService.getAllByType('OPU')
      .subscribe(res => { this.lstAssessee = res; });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.assuranceService.getById(id).subscribe(
        res => {
          this.assurance = res;
          console.log(this.assurance);
          let startDate = null;
          if (this.assurance.startDate) {
            startDate = new Date(this.assurance.startDate);
          }
          let endDate = null;
          if (this.assurance.endDate) {
            endDate = new Date(this.assurance.endDate);
          }
          if (this.assurance.teamLead) {
            this.teamLead.id = this.assurance.teamLead;
          }
          if (this.assurance.leadAssessor) {
            this.leadAssessor.id = this.assurance.leadAssessor;
          }
          this.isFc = this.assurance.assuranceTypeName === 'Functional Checklist';
          this.form.patchValue({
            month: this.assurance.month + '',
            mdLocationId: this.assurance.mdLocationId,
            startDate: startDate,
            endDate: endDate,
            mdEnterpriseId: this.assurance.mdEnterpriseId,
            scope: this.assurance.scope,
            proposedAgenda: this.assurance.proposedAgenda,
            remark: this.assurance.remark,
          });
        }
      );
    });
  }


  onSave() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;

    this.assurance.startDate = formValue.startDate;
    this.assurance.endDate = formValue.endDate;
    this.assurance.scope = formValue.scope;
    this.assurance.proposedAgenda = formValue.proposedAgenda;
    this.assurance.remark = formValue.remark;
    this.assurance.teamLead = this.teamLead ? this.teamLead.id : '';
    this.assurance.leadAssessor = this.leadAssessor ? this.leadAssessor.id : '';
    this.assuranceService.update(this.assurance)
      .subscribe(res => {
        this.dialogHelper.showSuccess(MessageConstant.MESSAGE_SAVE_SUCCESSFULLY);
      },
    );
  }

  openAssurancePlan() {
    const assuranceRef = this.dialog.open(AssurancePlanDialogComponent, {
      width: '900px',
      position: {
        top: '60px'
      },
    });
  }

  isMetMinimum(frequency: number, quarter: number) {
    const quarterData = this.monthlyFrequency.slice(quarter * 3, quarter * 3 + 3);
    const minium = quarterData.reduce((previous, current) => {
      return previous + current;
    });
    if (frequency >= minium) {
      return true;
    } else {
      return false;
    }
  }
}
