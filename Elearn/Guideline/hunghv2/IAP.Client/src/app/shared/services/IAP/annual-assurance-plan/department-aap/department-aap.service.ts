import { Injectable } from '@angular/core';
import { DataService } from '../../../data-service/data-service.service';
import { IapHttpClient } from '../../../iap-http-client/iap-http-client.service';
import { Router } from '@angular/router';

@Injectable()
export class DepartmentAapService extends DataService{

  constructor(http: IapHttpClient, router: Router) {
    super('departmentAAPs', http, router)
   }
   searchByFilter(model){
    return this.http.post(`${this.rootUrl + this.url}/filter`, model)
    .map(res => res)
    .catch(this.handleError);
  }
  getMDForFilter(){
    return this.http.get(`${this.rootUrl + this.url}/getMasterData`)
    .map(res => res)
    .catch(this.handleError);
  }
}
