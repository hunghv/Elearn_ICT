import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AssuranceLineService extends DataService {

  constructor(http: IapHttpClient, router: Router) {

    super('assuranceLine', http, router);
  }

}
