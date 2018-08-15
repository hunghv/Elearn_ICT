import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class UserProfileService extends DataService {

  constructor(http: IapHttpClient, router: Router) {
    super('UserProfile', http, router);
  }

  getUserRoles() {
    return this.http.get(`${this.rootUrl + 'UserProfile/GetUserRoles'}`)
      .map(res => res)
      .catch(this.handleError);
  }

  getUserInformation() {
    return this.http.get(`${this.rootUrl + 'UserProfile/GetUserInformation'}`)
      .map(data => data, error => error)
      .catch(this.handleError);
  }

  getByEmail(email: string) {
    return this.http.get(`${this.rootUrl}${this.url}/getByEmail`, {
      params: {
        email: email
      }
    });
  }
}
