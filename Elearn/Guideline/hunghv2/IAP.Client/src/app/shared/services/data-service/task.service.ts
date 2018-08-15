import { Injectable } from '@angular/core';
import { DataService } from '../data-service/data-service.service';
import { IapHttpClient } from '../iap-http-client/iap-http-client.service';
import { Router } from '@angular/router';

@Injectable()
export class MyTaskService extends DataService {

  constructor(http: IapHttpClient, router: Router) {
    super("myTasks", http, router);
  }
}
