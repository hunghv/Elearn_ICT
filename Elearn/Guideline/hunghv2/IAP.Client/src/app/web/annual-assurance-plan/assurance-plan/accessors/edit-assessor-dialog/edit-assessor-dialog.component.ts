import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserControlInfo } from './../../../../../shared/models/common.model';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Assessor } from '../../../../../shared/models/IAP/annual-assurance-plan/assessor/assessor.model';
import { DialogHelperService } from '../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AssessorService } from '../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assessor-service/assessor.service';
import { AppError } from '../../../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../../../shared/services/data-service/not-found-error';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInformation } from '../../../../../shared/models/user.model';
import { AuthService } from '../../../../../shared/services/authentication/auth.service';
import { HelperModule } from '../../../../../shared/helper/helper.module';
import { MessageConstant } from '../../../../../shared/constants/message.constants';
import { PeoplePickerComponent } from '../../../../../shared/components/common/people-picker/people-picker.component';

@Component({
  selector: 'iap-edit-assessor-dialog',
  templateUrl: './edit-assessor-dialog.component.html',
  styleUrls: ['./edit-assessor-dialog.component.scss'],
})
export class EditAssessorDialogComponent implements OnInit {
  assuranceId;
  isEdit = false;
  assessor: Assessor;
  userInformation: UserInformation;
  @ViewChild('ppAssessor') ppAssessor: PeoplePickerComponent;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialogHelper: DialogHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAssessorDialogComponent>,
    private assessorService: AssessorService,
    private authService: AuthService
  ) {
    // if (data) {
    //   this.assessor = data.assessor || null;
    //   this.isEdit = data.isEdit || false;
    //   if (data.assurancePlanId) {
    //     this.assuranceId = data.assurancePlanId;
    //   }
    // }

    this.userInformation = this.authService.getUserInformation();
    this.assessor = new Assessor();
    this.assessor.id = HelperModule.newGuid();
    this.assessor.leadAssessorId = this.userInformation.id;
    this.assessor.opu = '';
    this.assessor.department = '';

  }

  ngOnInit() {
    if (this.data.isSecondLine) {
      //second line
      this.assessor.assuranceProviderId = this.data.assurancePlanId;
    }
    else {
      this.assessor.assurancePlanId = this.data.assurancePlanId;
    }
  }


  onSubmit() {

    if (this.data.isSecondLine) {
      //second line
      this.assessor.assuranceProviderId = this.data.assurancePlanId;
      // this.assessorService.update(this.assessor)
      //   .subscribe(res => {
      //     this.dialogHelper.showSuccess("Save successfully!");
      //     // this.assurance = res;
      //   },
      // );
    }
    else {
      //first line
      this.assessor.assurancePlanId = this.data.assurancePlanId;
    }

    debugger;
    //validate
    if(this.assessor.email != undefined && this.assessor.email != '') {
      this.assessorService.create(this.assessor)
      .subscribe(res => {
        this.dialogHelper.showSuccess(MessageConstant.MESSAGE_SAVE_SUCCESSFULLY);
        // pass data to list ap to render new resource with out call api
        this.dialogRef.close(res);
      },
        (error: AppError) => {
          // handle expected error;
          if (error instanceof NotFoundError) {
            this.dialogHelper.showError('This assessor doesnt exist');
          } else {
            // or just log error message from server
            this.dialogHelper.showError(error.originalError.error.exceptionMessage);
          }
        });
    }
    else {
      this.ppAssessor.hasError = true;
    }

    
  }

  // loadForm() {
  //   this.assessorForm = this.fb.group({
  //     name: '',
  //     department: '',
  //     email: '',
  //     assurancePlanId: '',
  //     opu: '',
  //   });
  //   // edit
  //   if (this.assessor) {
  //     this.assessorForm.patchValue({
  //       name: this.assessor.name,
  //       department: this.assessor.department,
  //       email: this.assessor.email,
  //       assurancePlanId: this.assessor.assurancePlanId,
  //       opu: this.assessor.opu,
  //     });
  //   }
  // }

  handleSelectedUser(selectedUser: UserControlInfo) {
    if (selectedUser != null) {
      this.assessor.email = selectedUser.email;
      this.assessor.opu = selectedUser.opu.name;
      this.assessor.name = selectedUser.displayName;
      this.assessor.department = 'BD Office';
    }
    else {
      this.assessor.email = '';
      this.assessor.opu = '';
      this.assessor.name = '';
      this.assessor.department = '';
    }
  }
}
