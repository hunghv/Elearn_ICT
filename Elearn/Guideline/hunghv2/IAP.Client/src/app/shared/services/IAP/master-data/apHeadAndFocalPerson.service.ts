import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class ApHeadAndFocalPersonService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('getAPHeadAndFocalPerson', http, router);
  }
  getAllById(id) {
    return this.http.get(`${this.rootUrl + this.url}/${id}`)
      .map(res => res)
      .catch(this.handleError);
  }

}
