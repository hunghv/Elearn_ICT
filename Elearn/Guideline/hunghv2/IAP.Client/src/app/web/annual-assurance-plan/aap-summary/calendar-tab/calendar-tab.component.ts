import { Component, OnInit } from '@angular/core';
import { SearchFilterDialogComponent } from '../search-filter-dialog/search-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { SummaryService } from '../../../../shared/services/IAP/summary/summary.service';
import { SearchFilterModel } from '../../../../shared/models/IAP/summary/search-filter.model';
import { DropdownModel } from '../../../../shared/models/common.model';

@Component({
  selector: 'iap-calendar-tab',
  templateUrl: './calendar-tab.component.html',
  styleUrls: ['./calendar-tab.component.scss']
})
export class CalendarTabComponent implements OnInit {

  filterMD: SearchFilterModel;
  filterFormResult: any;
  filterResultDisplay: any[] = [];
  data: any[];

  constructor(private dialog: MatDialog,
    private summaryService: SummaryService
  ) {
    this.data = [
      { month: 'JAN' },
      { month: 'FEB' },
      { month: 'MAR' },
      { month: 'APR' },
      { month: 'MAY' },
      { month: 'JUN' },
      { month: 'JUL' },
      { month: 'AUG' },
      { month: 'SEP' },
      { month: 'OCT' },
      { month: 'NOV' },
      { month: 'DEC' }
    ];
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
    searchFilter.afterClosed().subscribe(filterFormData => {
      this.filterFormResult = filterFormData;
      this.getCalendar();
    });
  }


  findNameById(lstData: any[], id: string) {
    const data = lstData.find(value => {
      return value.id === id;
    });
    if (data) {
      return data.display;
    }
  }

  handleRemoveFilter(fieldName: string) {
    if (fieldName && this.filterFormResult[fieldName]) {
      this.filterFormResult[fieldName] = '';
    }
    this.getCalendar();
  }

  getCalendar() {
    this.summaryService.
      getCalendarView(this.filterFormResult).
      subscribe((data: any) => {
        if (data && data.result && data.result.listCalendarMonth) {
          const result = data.result.listCalendarMonth;
          result.forEach(monthData => {
            if (monthData) {
              this.data[monthData.month - 1].info = monthData;
            }
          });
        }
      });
  }

  checkHasData() {
    return this.data.some(value => {
      return value.info;
    });
  }
}
