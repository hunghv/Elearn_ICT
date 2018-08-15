import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../data-service/data-service.service';
import { IapHttpClient } from '../../../../iap-http-client/iap-http-client.service';
import { Router } from '@angular/router';

@Injectable()
export class AssuranceProviderService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('AssuranceProviders', http, router);
  }

  getAllByAssurancePlanId(assurancePlanId) {
    return this.http.get(this.rootUrl + this.url + '?assurancePlanId=' + assurancePlanId)
      .map(res => res)
      .catch(this.handleError);
  }

}
