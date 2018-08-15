import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class MdAuditorService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('getallAutditorByType', http, router);
  }
  getAllByType(type) {
    return this.http.get(`${this.rootUrl + this.url}/${type}`)
      .map(res => res)
      .catch(this.handleError);
  }

}
