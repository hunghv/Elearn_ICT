import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IapHttpClient } from '../../iap-http-client/iap-http-client.service';
import { DataService } from '../../data-service/data-service.service';
import { Router } from '@angular/router';

@Injectable()
export class MDUserProfileService extends DataService {

    constructor(http: IapHttpClient, router: Router) {
        super('MDUserProfileUserProfile', http, router);
    }

    searchMDUserProfile(pageNumber: any, pageSize: any, defaultRole: any, keyword: any) {
        let params = new HttpParams();
        params = params.append('pageNumber', pageNumber.toString());
        params = params.append('pageSize', pageSize.toString());
        if (defaultRole !== '' && defaultRole != null && defaultRole !== undefined) {
            params = params.append('defaultRole', defaultRole.toString());
        }
        if (keyword !== '' && keyword != null && keyword !== undefined) {
            params = params.append('keyword', keyword.toString());
        }
        return this.http.get(`${this.rootUrl}SearchMDUserProfile`, { params: params })
            .map(data => data, error => error)
            .catch(this.handleError);
    }

    getUserRolesById(id: any) {
        return this.http.get(`${this.rootUrl}getUserRolesById/${id}`);
    }
}
