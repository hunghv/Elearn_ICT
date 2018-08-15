import { Component, OnInit } from '@angular/core';
import { BrowserLocationService } from '../../../shared/services/browser-location/browser-location.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageConstant } from '../../../shared/constants/message.constants';
import { AssuranceProviderModel } from '../../../shared/models/IAP/assurance-provider/assurance-provider.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperModule } from '../../../shared/helper/helper.module';
import { MdAuditorService } from '../../../shared/services/IAP/master-data/mdAuditor.service';
import { AssurancePlan } from '../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { ApHeadAndFocalPersonModel } from '../../../shared/models/IAP/assurance-provider/apHeadAndFocalPerson.model';
import { ApHeadAndFocalPersonService } from '../../../shared/services/IAP/master-data/apHeadAndFocalPerson.service';
import { debug } from 'util';
import {
  AssuranceProviderService
} from '../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-provider-service/assurance-provider-service';
import { DialogHelperService } from '../../../shared/services/dialog-helper/dialog-helper.service';
import { AppError } from '../../../shared/services/data-service/app-error';
import { NotFoundError } from '../../../shared/services/data-service/not-found-error';

@Component({
  selector: 'iap-assurance-provider-detail',
  templateUrl: './assurance-provider-detail.component.html',
  styleUrls: ['./assurance-provider-detail.component.scss']
})
export class AssuranceProviderDetailComponent implements OnInit {

  assuranceProviderItem: AssuranceProviderModel = new AssuranceProviderModel();
  assuranceProviderDetailId: string;
  listAttachmentId: any[] = [];
  form: FormGroup;
  assuranceProvider: FormControl;
  assuranceProviderId: FormControl;
  scope: FormControl;
  evidencePrior: FormControl;
  id: FormControl;
  evidenceDuring: FormControl;
  expenses: FormControl;
  lstProvider: any;
  lstMDAuditor;
  assurance: AssurancePlan;
  assuranceId: string;
  isEdit = false;

  apHeadAndFocalPerson: ApHeadAndFocalPersonModel = new ApHeadAndFocalPersonModel();
  message = MessageConstant;


  constructor(
    public location: BrowserLocationService,
    public route: ActivatedRoute,
    private assuranceProviderService: AssuranceProviderService,
    private auditorService: MdAuditorService,
    private apHeadAndFocalPersonService: ApHeadAndFocalPersonService,
    private dialogHelper: DialogHelperService,
    private router: Router
  ) {
    this.auditorService.getAllByType('Assurance Provider')
      .subscribe(res => { this.lstMDAuditor = res; console.log(res); });
  }

  ngOnInit() {
    this.createForm();
  }

  createFormControl() {
    this.id = new FormControl();
    this.assuranceProvider = new FormControl;
    this.assuranceProviderId = new FormControl('', Validators.required);
    this.scope = new FormControl('', Validators.required);
    this.evidencePrior = new FormControl('', Validators.required);
    this.evidenceDuring = new FormControl('', Validators.required);
    this.expenses = new FormControl('', Validators.required);
    this.apHeadAndFocalPerson.apFocalPersonName = '<System Autopopulate>';
    this.apHeadAndFocalPerson.apHeadPersonName = '<System Autopopulate>';
    this.assuranceProviderItem.ref = '<System Autopopulate>';
  }

  createForm() {
    this.createFormControl();
    this.form = new FormGroup({
      id: this.id,
      assuranceProvider: this.assuranceProvider,
      assuranceProviderId: this.assuranceProviderId,
      scope: this.scope,
      evidencePrior: this.evidencePrior,
      evidenceDuring: this.evidenceDuring,
      expenses: this.expenses,
    });

    this.route.params.subscribe(routeData => {

      this.assuranceId = routeData.assuranceId;
      if (routeData.id !== undefined && routeData.id != null) {
        this.isEdit = true;
      }
      const id = this.isEdit ? routeData.id : HelperModule.newGuid();
      this.assuranceProviderDetailId = id;

      this.assuranceProviderService.getById(id).subscribe(
        res => {
          this.assuranceProviderItem = res;
          if (this.isEdit) {
            this.onAssuranceProviderChange({ source: { value: this.assuranceProviderItem.assuranceProviderId } });
          }
          if (this.assuranceProviderItem == null) {
            this.assuranceProviderItem = new AssuranceProviderModel();
          }
          this.form.patchValue({
            assuranceProvider: this.assuranceProviderItem.assuranceProvider,
            assuranceProviderId: this.assuranceProviderItem.assuranceProviderId,
            scope: this.assuranceProviderItem.scope,
            evidencePrior: this.assuranceProviderItem.evidencePrior,
            evidenceDuring: this.assuranceProviderItem.evidenceDuring,
            expenses: this.assuranceProviderItem.expenses,
          });
        }
      );

    });
  }

  saveAssuranceProvider() {
    this.form.value.id = this.assuranceProviderDetailId;
    const formValue = this.form.value;
    this.assuranceProviderItem.id = this.assuranceProviderDetailId;
    this.assuranceProviderItem.apFocal = this.apHeadAndFocalPerson.apFocalPersonId;
    this.assuranceProviderItem.apHead = this.apHeadAndFocalPerson.apHeadId;
    this.assuranceProviderItem.assurancePlanId = this.assuranceId;
    this.assuranceProviderItem.assuranceProvider = formValue.assuranceProvider;
    this.assuranceProviderItem.assuranceProviderId = formValue.assuranceProviderId;
    this.assuranceProviderItem.scope = formValue.scope;
    this.assuranceProviderItem.evidencePrior = formValue.evidencePrior;
    this.assuranceProviderItem.evidenceDuring = formValue.evidenceDuring;
    this.assuranceProviderItem.expenses = formValue.expenses;
    
    if(this.form.invalid)
    return;

    if (this.isEdit) {
      this.assuranceProviderService.update(this.assuranceProviderItem)
        .subscribe(res => {
          this.dialogHelper.showSuccess('Save successfully!');
          this.router.navigateByUrl('/web/annual-assurance-plan/assurance-plan/' + this.assuranceId);
          // this.assurance = res;
        },
      );
    } else {
      this.assuranceProviderService.create(this.assuranceProviderItem)
        .subscribe(res => {
          this.dialogHelper.showSuccess('Save successfully!');
          // this.router.navigateByUrl('/web/annual-assurance-plan/assurance-plan/' + this.assuranceId);
          this.router.navigateByUrl(
            '/web/annual-assurance-plan/assurance-plan/' + this.assuranceId + '/apd/edit/' + this.assuranceProviderItem.id
          );
        },
          (error: AppError) => {
            // handle expected error;
            if (error instanceof NotFoundError) {
              this.dialogHelper.showError('This provider already exists');
            } else {
              // or just log error message from server
              this.dialogHelper.showError(error.originalError.error.exceptionMessage);
            }
          });
    }
  }

  handleAfterUpload(uploadedId) {
    this.listAttachmentId.push(uploadedId);
    this.listAttachmentId = [...this.listAttachmentId];
  }

  handleAfterDelete(deletedId) {
    this.listAttachmentId = this.listAttachmentId.filter(id => {
      return id !== deletedId;
    });
  }

  onAssuranceProviderChange(event) {
    // Get check list based on risk area
    this.apHeadAndFocalPersonService.getAllById(event.source.value).subscribe(res => {
      this.apHeadAndFocalPerson = res;
      // console.log(res);
    });

  }

  cancel() {
    this.router.navigateByUrl('/web/annual-assurance-plan/assurance-plan/' + this.assuranceId);
  }
}
