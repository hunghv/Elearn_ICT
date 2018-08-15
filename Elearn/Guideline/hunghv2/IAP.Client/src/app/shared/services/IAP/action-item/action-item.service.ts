import { Injectable } from '@angular/core';
import { DataService } from '../../data-service/data-service.service';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { UrlConstants } from '../../../constants/url.constants';
import { Router } from '@angular/router';

@Injectable()
export class ActionItemService extends DataService {

  constructor(http: IapHttpClient, router: Router) {
    super(UrlConstants.ACTION_ITEM, http, router);
  }

  getListActionItemByFindings(findingsId: any) {
    return this.http.get(this.rootUrl + this.url + `/findings/${findingsId}`)
      .catch(super.handleError);
  }
}
