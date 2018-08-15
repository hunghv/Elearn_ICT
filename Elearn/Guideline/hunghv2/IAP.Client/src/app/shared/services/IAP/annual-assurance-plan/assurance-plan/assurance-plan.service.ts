import { Injectable } from '@angular/core';
import { DataService } from '../../../data-service/data-service.service';
import { DialogHelperService } from '../../../dialog-helper/dialog-helper.service';
import { IapHttpClient } from '../../../iap-http-client/iap-http-client.service';
import { Router } from '@angular/router';

@Injectable()
export class AssurancePlanService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('assurancePlans', http, router);
  }
  getMDForFilter() {
    return this.http.get(`${this.rootUrl + this.url}/getMasterData`)
    .map(res => res)
    .catch(this.handleError);
  }
  searchByFilter(model) {
    return this.http.post(`${this.rootUrl + this.url}/filter`, model)
    .map(res => res)
    .catch(this.handleError);
  }
  createReport(model: any) {
    return this.http.post(`${this.rootUrl}${this.url}/createReport`, model);
  }
  getFirstLineMsEndorserApproverView(id) {
    return this.http.get(`${this.rootUrl + this.url}/${id}/GetFirstLineMsEndorserApproverView `)
    .map(res => res)
    .catch(this.handleError);
  }
  getFirstLineMsLeadAccessorReportApproverView(id) {
    return this.http.get(`${this.rootUrl + this.url}/${id}/GetFirstLineMsLeadAccessorReportApproverView `)
    .map(res => res)
    .catch(this.handleError);
  }

  getChecklistApproverReview(assuarancePlanId){
    return this.http.get(this.rootUrl + this.url + `/${assuarancePlanId}/` + 'GetFirstLineFcApproverView')
    .map(res => res)
    .catch(this.handleError);
  }

  getFirstLineFcAssignActionPartyView(assuarancePlanId){
    return this.http.get(this.rootUrl + this.url + `/${assuarancePlanId}/` + 'GetFirstLineFcAssignActionPartyView')
    .map(res => res)
    .catch(this.handleError);
  }
}
