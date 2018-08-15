import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SummaryService } from '../../../../../shared/services/IAP/summary/summary.service';
import { SearchFilterModel } from '../../../../../shared/models/IAP/summary/search-filter.model';

@Component({
  selector: 'iap-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Input() filterMD: SearchFilterModel;
  @Output() filterApply: EventEmitter<any> = new EventEmitter();
  isAdvanced: boolean;
  filterForm: FormGroup;

  constructor(private service: SummaryService) {
    this.isAdvanced = false;
  }

  ngOnInit() {
    this.createForm();
  }

  toggleFilterAdvanced() {
    this.isAdvanced = !this.isAdvanced;
  }

  createForm() {
    this.filterForm = new FormGroup({
      assuranceYear: new FormControl(),
      opuCompany: new FormControl(),
      department: new FormControl(),
      assuranceRole: new FormControl(),
      location: new FormControl(),
      assuranceLine: new FormControl(),
      assuranceType: new FormControl(),
      riskArea: new FormControl(),
      checklist: new FormControl(),
      assuranceProvider: new FormControl(),
    });
  }

  applyFilter() {
    this.filterApply.emit(this.filterForm.value);
  }

  resetForm() {
    this.filterForm.reset();
  }
}
