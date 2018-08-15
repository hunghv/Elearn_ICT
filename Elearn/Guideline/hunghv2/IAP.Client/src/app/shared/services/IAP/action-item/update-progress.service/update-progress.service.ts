import { Injectable } from '@angular/core';
import { DataService } from '../../../data-service/data-service.service';
import { IapHttpClient } from '../../../iap-http-client/iap-http-client.service';
import { UrlConstants } from '../../../../constants/url.constants';
import { Router } from '@angular/router';

@Injectable()
export class ActionItemProgressService extends DataService {

  constructor(http: IapHttpClient, router: Router) {
    super(UrlConstants.ACTION_ITEM_PROGRESS, http, router);
  }

  getListActionItemProgressByActionItemId(actionItemId: any) {
    return this.http.get(this.rootUrl + this.url + `/actionitem/${actionItemId}`)
      .catch(super.handleError);
  }
}
