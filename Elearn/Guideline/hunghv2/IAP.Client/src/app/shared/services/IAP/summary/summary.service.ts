import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { APP_CONFIG } from '../../app-config/app-config.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SearchFilterModel } from '../../../models/IAP/summary/search-filter.model';
import { FilterFormModel } from '../../../models/IAP/summary/filter-form.model';
import { HttpParams } from '@angular/common/http';
import { SummaryFilterModel } from '../../../models/IAP/summary/summary-filter.model';

@Injectable()
export class SummaryService {

  constructor(private http: IapHttpClient) { }

  getSearchFilterData() {
    if (sessionStorage && sessionStorage.filterData) {
      return Observable.create((observer: Observer<SearchFilterModel>) => {
        observer.next(JSON.parse(sessionStorage.filterData));
      });
    } else {
      return new Observable((observer: Observer<SearchFilterModel>) => {
        this.http.get(`${APP_CONFIG.apiServer}getSearchFilter`).subscribe((data: SearchFilterModel) => {
          sessionStorage.filterData = JSON.stringify(data);
          observer.next(data);
        });
      });
    }
  }

  getResourceLoading(filterModel: FilterFormModel, index: number = 1, pageSize: number = 20) {
    let params = new HttpParams();
    for (const prop in filterModel) {
      if (filterModel.hasOwnProperty(prop)) {
        if (filterModel[prop]) {
          params = params.append(`filterModel.${prop}`, filterModel[prop]);
        }
      }
    }
    params = params.append('pageNumber', index.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get(`${APP_CONFIG.apiServer}summary/getResourceLoading`, {
      params: params
    });
  }

  getCalendarView(filterModel: FilterFormModel) {
    let params = new HttpParams();
    for (const prop in filterModel) {
      if (filterModel.hasOwnProperty(prop)) {
        if (filterModel[prop]) {
          params = params.append(`filterModel.${prop}`, filterModel[prop]);
        }
      }
    }
    return this.http.get(`${APP_CONFIG.apiServer}summary/getCalendar`, {
      params: params
    });
  }

  getSummaryChartView(filterModel: SummaryFilterModel) {
    let params = new HttpParams();
    for (const prop in filterModel) {
      if (filterModel.hasOwnProperty(prop)) {
        if (filterModel[prop]) {
          params = params.append(prop, filterModel[prop]);
        }
      }
    }
    return this.http.get(`${APP_CONFIG.apiServer}summary/getSummaryChart`, {
      params: params
    });
  }

  getSummaryListingView(filterModel: SummaryFilterModel) {
    let params = new HttpParams();
    for (const prop in filterModel) {
      if (filterModel.hasOwnProperty(prop)) {
        if (filterModel[prop]) {
          params = params.append(prop, filterModel[prop]);
        }
      }
    }
    return this.http.get(`${APP_CONFIG.apiServer}summary/getSummaryListing`, {
      params: params
    });
  }
}
