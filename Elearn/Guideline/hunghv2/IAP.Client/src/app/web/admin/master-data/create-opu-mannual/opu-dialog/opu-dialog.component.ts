import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { OPU } from '../../../../../shared/models/IAP/annual-assurance-plan/opu.model';
import { OpuService } from '../../../../../shared/services/IAP/annual-assurance-plan/opu.service';
import { DialogHelperService } from '../../../../../shared/services/dialog-helper/dialog-helper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppError } from '../../../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../../../shared/services/data-service/not-found-error';
import { AssuranceLineService } from '../../../../../shared/services/IAP/master-data/assurance-line.service';
import { FormControl } from '@angular/forms';
import { MessageConstant } from '../../../../../shared/constants/message.constants';

@Component({
  selector: 'iap-opu-dialog',
  templateUrl: './opu-dialog.component.html',
  styleUrls: ['./opu-dialog.component.scss'],
})
export class OPUDialogComponent implements OnInit {

  frequency: any[];
  form;
  opu: OPU;

  ngOnInit() {
    this.loadForm();
  }

  constructor(private opuService: OpuService,
    public fb: FormBuilder,
    private dialogHelper: DialogHelperService,
    private dialogRef: MatDialogRef<OPUDialogComponent>) {
  }

  loadForm() {

    this.form = this.fb.group({
      year: '2018',
      isMannual: true,
      assuranceLineId: '',
      auditorId: '',
      enterpriseId: ''
    });

    this.opuService.create({ isMannual: true })
      .subscribe(res => {
        this.opu = res;
      });
  }

  onSubmit() {
    this.opu.year = this.form.value.year;
    this.opu.assuranceLineId = this.form.value.assuranceLineId;
    this.opu.enterpriseId = this.form.value.enterpriseId;
    this.opu.auditorId = this.form.value.auditorId;
    this.opu.isManual = true;
    this.opuService.create(this.opu).subscribe(res => {
      this.dialogHelper.showSuccess(MessageConstant.MESSAGE_SAVE_SUCCESSFULLY);
      this.dialogRef.close(res);
    },
    (error) => {
      // handle expected error;
      if (error) {
        this.dialogHelper.showError('Data is not unique. Please check again');
      }
    });
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
