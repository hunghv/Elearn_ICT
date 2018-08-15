import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { SearchFilterModel } from '../../../../shared/models/IAP/summary/search-filter.model';

@Component({
  selector: 'iap-search-filter-result',
  templateUrl: './search-filter-result.component.html',
  styleUrls: ['./search-filter-result.component.scss']
})
export class SearchFilterResultComponent implements OnInit, OnChanges {

  @Input() filterMD: SearchFilterModel;
  @Input() filterFormResult;

  @Output() removeFilter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(): void {
  }

  ngOnInit() {
  }

  findNameById(lstData: any[], id: string) {
    const data = lstData.find(value => {
      return value.id === id;
    });
    if (data) {
      return data.display;
    }
  }

  clearField(fieldName) {
    this.removeFilter.emit(fieldName);
  }

}
