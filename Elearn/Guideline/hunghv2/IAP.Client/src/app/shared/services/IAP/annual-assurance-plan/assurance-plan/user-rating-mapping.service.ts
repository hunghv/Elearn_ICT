import { Injectable } from '@angular/core';
import { DataService } from '../../../data-service/data-service.service';
import { DialogHelperService } from '../../../dialog-helper/dialog-helper.service';
import { IapHttpClient } from '../../../iap-http-client/iap-http-client.service';
import { Router } from '@angular/router';
import { UserRatingMappingModel } from '../../../../components/dialog/remark-dialog/remark-question.model';

@Injectable()
export class UserRatingMappingService extends DataService {

  constructor(http: IapHttpClient, router: Router) {
    super('UserRatingMappings', http, router);
  }

  getList(assurancePlanId: string, userId: string) {
    return this.http.get(`${this.rootUrl}${this.url}?assurancePlanId=${assurancePlanId}&userId=${userId}`)
      .map(res => res)
      .catch(this.handleError);
  }

  createList(model: UserRatingMappingModel[]) {
    return this.http.post(`${this.rootUrl}${this.url}/CreateList`, model);
  }

  updateList(model: UserRatingMappingModel[]) {
    return this.http.put(`${this.rootUrl}${this.url}/UpdateList`, model);
  }
}
