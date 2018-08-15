import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../../../iap-http-client/iap-http-client.service';
import { DataService } from '../../../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class ChecklistItemService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('checklistItems', http, router);
  }

  getByIdTypeMS(id) {
    return this.http.get(`${this.rootUrl + 'checklistItemsTypeMS'}/${id}`)
      .map(res => res)
      .catch(this.handleError);
  }
  getByIdTypeFC(id) {
    return this.http.get(`${this.rootUrl + 'checklistItemsTypeFC'}/${id}`)
      .map(res => res)
      .catch(this.handleError);
  }
  
}
