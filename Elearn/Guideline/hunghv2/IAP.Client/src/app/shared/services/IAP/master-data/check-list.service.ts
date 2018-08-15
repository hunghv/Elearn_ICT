import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class CheckListFcService extends DataService {

   constructor(http: IapHttpClient, router: Router) {

     super('checklistMDFCs', http, router);
   }

  getAllByParentId(parentId) {
   if (parentId) {
    return this.http.get(`${this.rootUrl + this.url}/${parentId}`)
    .map(res => res)
    .catch(this.handleError);
   } else {
    return null;
  }
  }
  apgetAllByParentId(parentId, mdAssuranceTypeId) {
    if (parentId && mdAssuranceTypeId) {
     return this.http.get(`${this.rootUrl + this.url}/${parentId}` + '?mdAssuranceTypeId=' + mdAssuranceTypeId)
     .map(res => res)
     .catch(this.handleError);
    } else {
     return null;
   }
   }
}
