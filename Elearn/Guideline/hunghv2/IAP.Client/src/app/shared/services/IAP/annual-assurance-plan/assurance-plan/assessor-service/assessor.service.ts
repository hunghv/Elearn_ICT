import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../data-service/data-service.service';
import { IapHttpClient } from '../../../../iap-http-client/iap-http-client.service';
import { Router } from '@angular/router';

@Injectable()
export class AssessorService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('assessors', http, router);
  }

  getAllAssessorByAssuranceProviderId(assuranceProviderId) {
    return this.http.get(this.rootUrl + 'assessors?assuranceProviderId=' + assuranceProviderId)
      .map(res => res)
      .catch(this.handleError);
  }

}
