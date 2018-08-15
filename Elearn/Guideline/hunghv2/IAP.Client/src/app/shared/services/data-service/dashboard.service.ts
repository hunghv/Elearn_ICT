import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data-service.service';
import { IapHttpClient } from '../iap-http-client/iap-http-client.service';

@Injectable()
export class DashboardService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('Dashboard', http, router);
  }
  getAssurancePlanByYear(year) {
    return this.http.get(`${this.rootUrl + this.url}/GetDashboard` + '?year=' + year)
    .map(res => res)
    .catch(this.handleError);
  }
}
