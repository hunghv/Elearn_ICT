import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DepartmentAapService } from '../../../../shared/services/IAP/annual-assurance-plan/department-aap/department-aap.service';
import { DeptAapFilterModel } from '../../../../shared/models/IAP/annual-assurance-plan/filter-model/dept-aap-filter.model';
import { LocationService } from '../../../../shared/services/IAP/master-data/location.service';

@Component({
  selector: 'iap-dept-aap-filter',
  templateUrl: './dept-aap-filter.component.html',
  styleUrls: ['./dept-aap-filter.component.scss']
})
export class DeptAapFilterComponent implements OnInit {

  @Output() searchClick: EventEmitter<any> = new EventEmitter();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter();
  @Output() resetClick: EventEmitter<any> = new EventEmitter();
  form;
  lstDepartment;
  filterModel: DeptAapFilterModel;
  constructor(
    private fb : FormBuilder,
    private deptAapService: DepartmentAapService,
    private locationService : LocationService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.loadMasterData();
  }
  createForm(){
    this.form = this.fb.group({
      refNo: '',
      assuranceLineId: '',
      enterpriseId: '',
      departmentId: '',
      year: '',
      assuranceProviderId: '',
    })
  }
  loadMasterData(){
    this.deptAapService.getMDForFilter()
    .subscribe(res => this.filterModel = res);
  }
  onSearchClick() {
    this.searchClick.emit(this.form.value);
  }
  onCancelClick(){
    this.cancelClick.emit();
  }
  onResetClick(){
    this.createForm();
    this.resetClick.emit()
  }
  onOpuChange(source){
    debugger;
    this.locationService.getByEnterpriseId(source.source.value, 'Department')
    .subscribe(res => this.lstDepartment = res);
  }
}
