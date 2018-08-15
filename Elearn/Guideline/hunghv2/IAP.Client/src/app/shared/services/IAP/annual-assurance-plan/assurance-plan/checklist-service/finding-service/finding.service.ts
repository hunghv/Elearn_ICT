import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../../../../iap-http-client/iap-http-client.service';
import { DataService } from '../../../../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class FindingService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('finding', http, router);
  }

  getfindingByParentIdId(parentId) {
    return this.http.get(this.rootUrl + this.url + `/parentId/${parentId}`)
      .map(res => res)
      .catch(this.handleError);
  }

}
