import { Component, OnInit, Inject } from '@angular/core';
import { DialogHelperService } from '../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppError } from '../../../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../../../shared/services/data-service/not-found-error';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DepartmentAapService } from '../../../../../shared/services/IAP/annual-assurance-plan/department-aap/department-aap.service';
import { DeptAAP } from '../../../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';
import { LocationService } from '../../../../../shared/services/IAP/master-data/location.service';
import { MessageConstant } from '../../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-add-dept-aap-dialog',
  templateUrl: './add-dept-aap-dialog.component.html',
  styleUrls: ['./add-dept-aap-dialog.component.scss']
})
export class EditDepartmentAAPDialogComponent implements OnInit {
  enterpriseId: any;
  email;
  form;
  opuId;
  deptAap: DeptAAP;
  isEdit = false;
  selectedValue = ['dept 1', 'dept 3'];
  lstLocation;

  constructor(
    private fb: FormBuilder,

    private dialogHelper: DialogHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditDepartmentAAPDialogComponent>,
    private deptAapService: DepartmentAapService,
    private locationService: LocationService) {
    this.opuId = data.opuId;
    this.enterpriseId = data.enterpriseId;
  }

  ngOnInit() {
    this.loadForm();
    const postData = {
      enterpriseId: this.enterpriseId,
      opuId: this.opuId,
    };
    this.locationService.getListDepartmentByOpuAapId(postData)
      .subscribe(res => {
        this.lstLocation = res;
      });
  }

  onSubmit() {
    this.pushListDeparmentToForm();
    this.form.value.isApply = false;
    this.deptAapService.create(this.form.value)
      .subscribe(res => {
        this.dialogHelper.showSuccess(MessageConstant.MESSAGE_SAVE_SUCCESSFULLY);
        this.dialogRef.close(res);
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            this.dialogHelper.showError('This deptAap doesnt exist');
          } else {
            this.dialogHelper.showError(error.originalError.exceptionMessage);
          }
        });
  }

  onApply() {
    this.pushListDeparmentToForm();
    this.form.value.isApply = true;
    this.deptAapService.create(this.form.value)
      .subscribe(res => {
        this.dialogHelper.showSuccess(MessageConstant.MESSAGE_SAVE_SUCCESSFULLY);
        this.dialogRef.close(res);
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            this.dialogHelper.showError('This deptAap doesnt exist');
          } else {
            this.dialogHelper.showError(error.originalError.exceptionMessage);
          }
        });
  }

  loadForm() {
    this.form = this.fb.group({
      name: 'this.deptAap.name',
      lstDepartment: new FormArray([]),
      opuId: this.opuId,
      enterpriseId: this.enterpriseId
    });
  }

  onCheckChange(event) {

    for (let i = 0; i < this.lstLocation.length; i++) {
      if (this.lstLocation[i].id === event.source.value) {
        this.lstLocation[i].isChecked = event.source.checked;
        return;
      }
    }
  }

  pushListDeparmentToForm() {
    const formArray: FormArray = this.form.get('lstDepartment') as FormArray;

    formArray.controls = [];
    for (let i = 0; i < this.lstLocation.length; i++) {
      if (this.lstLocation[i].isChecked) {
        formArray.push(new FormControl(this.lstLocation[i].id));
      }
    }
  }
}
