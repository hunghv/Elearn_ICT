import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssurancePlanService } from '../../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { AssuranceFilterModel } from '../../../../../shared/models/IAP/annual-assurance-plan/assurance-plan/filtel.model';
import { LocationService } from '../../../../../shared/services/IAP/master-data/location.service';
import { CheckListFcService } from '../../../../../shared/services/IAP/master-data/check-list.service';
import { UserControlInfo } from '../../../../../shared/models/common.model';

@Component({
  selector: 'iap-assurance-plan-filter',
  templateUrl: './assurance-plan-filter.component.html',
  styleUrls: ['./assurance-plan-filter.component.scss']
})
export class AssurancePlanFilterComponent implements OnInit {
  isSecondLine: boolean = false;

  isAssuranceTypeFc = true;
  form: FormGroup;
  assuranceFilter: AssuranceFilterModel;
  @Output() searchClick: EventEmitter<any> = new EventEmitter();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter();
  @Output() resetClick: EventEmitter<any> = new EventEmitter();

  lstDepartment;
  constructor(
    private locationService: LocationService,
    private fb: FormBuilder,
    private apService: AssurancePlanService,
    private checkListFcService: CheckListFcService,
  ) { }
  lstMonth = [
    { value: 1, display: 'January' },
    { value: 2, display: 'February' },
    { value: 3, display: 'March' },
    { value: 4, display: 'April' },
    { value: 5, display: 'May' },
    { value: 6, display: 'June' },
    { value: 7, display: 'July' },
    { value: 8, display: 'August' },
    { value: 9, display: 'September' },
    { value: 10, display: 'October' },
    { value: 11, display: 'November' },
    { value: 12, display: 'December' },
  ]
  ngOnInit() {
    this.getMasterDataForSearch();

    this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      refNo: '',
      title: '',
      assuranceLineId: '',
      opuOrCompanyId: '',
      riskAreaId: '',
      departmentId: '',
      assuranceTypeId: '',
      year: '',
      checklistId: '',
      assuranceProviderId: '',
      monthTo: '',
      monthFrom: '',
      leadAssessorId: '',
      assessorId: '',
      teamLeadId: '',
      assuranceStartDate: '',
      assuranceEndDate: '',
      locationId: '',
    });
  }
  getMasterDataForSearch() {
    this.apService.getMDForFilter()
      .subscribe(res => {
        this.assuranceFilter = res
      });
    this.getDeptByOpu();
  }
  onSearchClick() {
    this.searchClick.emit(this.form.value);
  }
  onCancelClick() {
    this.cancelClick.emit();
  }
  onResetClick() {
    this.createForm();
    this.resetClick.emit()
  }
  getDeptByOpu() {
    this.locationService.getByType({
      type: 'Department'
    }).subscribe(res => this.lstDepartment = res);
  }
  onLineChange(event) {
    let assuranceLineName: string;
    for (let i = 0; i < this.assuranceFilter.mdAssuranceLines.length; i++) {
      if (this.assuranceFilter.mdAssuranceLines[i].id === event.source.value) {
        assuranceLineName = this.assuranceFilter.mdAssuranceLines[i].name;

        if (assuranceLineName === 'Second Line') {
          this.isSecondLine = true;
          return;
        } else {
          this.isSecondLine = false;
        }
      }
    }
  }
  onRiskAreaChange(event) {
    this.checkListFcService
      .apgetAllByParentId(event.source.value, this.form.value.assuranceTypeId)
      .subscribe(res =>
        this.assuranceFilter.mdChecklist = res
      );
  }
  onAssuranceTypeChange(event) {
    if (this.form.value.riskAreaId) {
      this.checkListFcService
        .apgetAllByParentId(this.form.value.riskAreaId, event.source.value)
        .subscribe(res =>
          this.assuranceFilter.mdChecklist = res
        );
    }

  }

  onTeamLeadSelect(teamlead: UserControlInfo) {
    if(teamlead && teamlead.id) {
      this.form.controls.teamLeadId.setValue(teamlead.id);
    }
  }

  onLeadAssessorSelect(lead: UserControlInfo) {
    if(lead && lead.id) {
      this.form.controls.leadAssessorId.setValue(lead.id);
    }
  }

  onAssessorSelect(ass: UserControlInfo) {
    if(ass && ass.id) {
      this.form.controls.assessorId.setValue(ass.id);
    }
  }
}
