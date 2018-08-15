import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../../../../shared/services/authentication/auth.service';
import { RemarkDialogComponent } from '../../../../../../shared/components/dialog/remark-dialog/remark-dialog.component';
import { MatDialog } from '@angular/material';
import { UserInformation } from '../../../../../../shared/models/user.model';
import { ParentFindingType } from '../../../../../../shared/constants/common.constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HelperModule } from '../../../../../../shared/helper/helper.module';
import { AssurancePlan } from '../../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { AssurancePlanService } from '../../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { MessageConstant } from '../../../../../../shared/constants/message.constants';
import { UserControlInfo } from '../../../../../../shared/models/common.model';
import { DialogHelperService } from '../../../../../../shared/services/dialog-helper/dialog-helper.service';
import { PeoplePickerComponent } from '../../../../../../shared/components/common/people-picker/people-picker.component';
@Component({
  selector: 'iap-finding-action-tab',
  templateUrl: './finding-action-tab.component.html',
  styleUrls: ['./finding-action-tab.component.scss']
})
export class FindingActionTabComponent implements OnInit, AfterViewInit {

  @Input() isSubmitter;
  @Input() assurancePlan: AssurancePlan;
  @ViewChild('ppApprover') ppApprover: PeoplePickerComponent;
  @ViewChild('ppHead') ppHead: PeoplePickerComponent;

  userInformation: UserInformation;
  isSecondLine: boolean;
  isFC = false;
  isApprover = false;
  isLeadAssessor = false;
  isApAssigner = false;
  message = MessageConstant;

  form: FormGroup;
  startDateControl: FormControl;
  endDateControl: FormControl;
  approver: UserControlInfo;
  headOfDepartment: UserControlInfo;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    public fb: FormBuilder,
    private apService: AssurancePlanService,
    private dialogHelper: DialogHelperService
  ) {
    this.userInformation = this.authService.getUserInformation();
  }

  ngOnInit() {
    this.createForm();

    this.apService.getById(this.assurancePlan.id)
      .subscribe(res => {
        this.assurancePlan = res;
        if (this.assurancePlan) {
          this.startDateControl.setValue(this.assurancePlan.startDate);
          this.endDateControl.setValue(this.assurancePlan.endDate);
          this.isSecondLine = this.assurancePlan.isSecondLine;
          this.isFC = this.assurancePlan.isAssuranceTypeFc;
        }
      });

    if (this.userInformation.listUserRoles.indexOf('Approver') !== -1) {
      this.isApprover = true;
    } else if (this.userInformation.listUserRoles.indexOf('LeadAssessor') !== -1) {
      this.isLeadAssessor = true;
    } else if (this.userInformation.listUserRoles.indexOf('ActionPartyAssigner') !== -1) {
      this.isApAssigner = true;
    }

  }

  ngAfterViewInit(): void {
  }

  createFormControl() {
    this.startDateControl = new FormControl('', Validators.required);
    this.endDateControl = new FormControl('', Validators.required);
  }

  createForm() {
    this.createFormControl();
    this.form = new FormGroup({
      startDate: this.startDateControl,
      endDate: this.endDateControl
    });
  }

  openAssessorRatingDialog() {
    const assessorRating = this.dialog.open(RemarkDialogComponent, {
      width: '900px',
      position: {
        top: '60px'
      },
      data: {
        assuranceId: this.assurancePlan.id,
        leadAccessorId: this.assurancePlan.leadAssessor
      }
    },);
  }

  saveProgress() {
    let isValid = true;
    if (!this.approver && this.ppApprover) {
      this.ppApprover.hasError = true;
      isValid = false;
    }
    if (!this.headOfDepartment && this.ppHead) {
      this.ppHead.hasError = true;
      isValid = false;
    }

    if (this.form.invalid || !isValid) {
      return;
    }

    this.apService.createReport({
      assuranceId: this.assurancePlan.id,
      startDate: this.startDateControl.value,
      endDate: this.endDateControl.value,
      approverId: this.approver ? this.approver.id : '',
      acknowledgerId: this.headOfDepartment ? this.headOfDepartment.id : ''
    }).subscribe(result => {
      if (result) {
        this.dialogHelper.showSuccess(this.message.MESSAGE_SAVE_SUCCESSFULLY);
      } else {
        this.dialogHelper.showError(this.message.MESSAGE_SAVE_FAIL);
      }
    });
  }
}
