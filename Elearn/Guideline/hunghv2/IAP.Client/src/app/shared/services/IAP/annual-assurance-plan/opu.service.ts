import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class OpuService extends DataService{

  
  constructor(http: IapHttpClient, router: Router) {

    super('oPUAAPs', http, router);
  }

}
