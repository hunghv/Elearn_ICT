import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchFilterDialogComponent } from '../search-filter-dialog/search-filter-dialog.component';
import { SummaryService } from '../../../../shared/services/IAP/summary/summary.service';
import { SearchFilterModel } from '../../../../shared/models/IAP/summary/search-filter.model';
import { FilterFormModel } from '../../../../shared/models/IAP/summary/filter-form.model';

@Component({
  selector: 'iap-resource-loading-tab',
  templateUrl: './resource-loading-tab.component.html',
  styleUrls: ['./resource-loading-tab.component.scss']
})
export class ResourceLoadingTabComponent implements OnInit {

  filterMD: SearchFilterModel;
  filterFormResult: any;
  months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  data: any[] = [];
  constructor(private dialog: MatDialog,
    private summaryService: SummaryService) {
  }

  ngOnInit() {
    this.summaryService.getSearchFilterData().subscribe((data: SearchFilterModel) => {
      this.filterMD = data;
    });
  }


  openFilter() {
    const searchFilter = this.dialog.open(SearchFilterDialogComponent, {
      width: '1000px',
      maxWidth: '80vw',
      maxHeight: '90vh',
      position: {
        top: '50px'
      },
      data: {
        filterMD: this.filterMD
      }
    });

    searchFilter.afterClosed().subscribe((data: FilterFormModel) => {
      this.filterFormResult = data;
      this.getResourceLoading();
    });
  }

  getResourceLoading() {
    this.summaryService.getResourceLoading(this.filterFormResult).subscribe((data: any) => {
      if (data && data.result && data.result.items) {
        const result = data.result.items;
        this.data = result;
      }
    });
  }

  handleRemoveFilter(fieldName: string) {
    if (fieldName && this.filterFormResult[fieldName]) {
      this.filterFormResult[fieldName] = '';
    }
    this.getResourceLoading();
  }
}
