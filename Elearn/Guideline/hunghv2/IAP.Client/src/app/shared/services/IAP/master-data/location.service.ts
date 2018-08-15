import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class LocationService extends DataService {

  constructor(http: IapHttpClient, router: Router) {
    super('mdLocations', http, router);
  }

  getListDepartmentByOpuAapId(postData) {
    return this.http.post(`${this.rootUrl + 'mdLocationsByOpu'}`, postData)
      .map(res => res)
      .catch(this.handleError);
  }
  getByType(postData) {
    return this.http.post(`${this.rootUrl + 'mdLocationsByType'}`, postData)
    .map(res => res)
    .catch(this.handleError);  
  }
  getByEnterpriseId(id, type) {
    return this.http.get(`${this.rootUrl}/mdLocationsByEnterprise`,{params: {id: id, type: type}})
    .map(res => res)
    .catch(this.handleError);  
  }
}
