import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AppError } from './app-error';
import { NotFoundError } from './not-found-error';
import { BadInputError } from './bad-input-error';
import { InternalError } from './internal-server-error';
import { RequestOptions } from '@angular/http';
import { IapHttpClient } from '../iap-http-client/iap-http-client.service';
import { APP_CONFIG } from '../app-config/app-config.service';
import { UnauthorizedError } from './unauthorized-error';
import { Router } from '@angular/router';
@Injectable()
export class DataService {
  rootUrl = APP_CONFIG.apiServer;

  constructor(public url, public http: IapHttpClient, private router: Router) {

  }

  // ToDo: QUANGNV8
  getAllAssessorByAssurancePlanId(assurancePlanId) {
    return this.http.get(this.rootUrl + this.url + '?assurancePlanId=' + assurancePlanId)
      .map(res => res)
      .catch(this.handleError);
  }

  getAll() {
    return this.http.get(this.rootUrl + this.url)
      .map(res => res)
      .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.rootUrl + this.url, resource)
      .map(res => res)
      .catch(this.handleError);
  }

  update(resource) {
    return this.http.put(this.rootUrl + this.url, resource)
      .map(res => res)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.request('delete', this.rootUrl + this.url, { body: [id] })
      .map(res => res)
      .catch(this.handleError);
  }

  deleteById(id) {
    console.log(this.rootUrl + this.url + `/${id}`);
    return this.http.delete(this.rootUrl + this.url + `/${id}`)
      .catch(this.handleError);
  }

  deleteElement(lstElement: any, element: any) {
    const index = lstElement.findIndex((i) => (i === element));
    if (index !== -1) {
      lstElement.splice(index, 1);
    }
    return lstElement;
  }

  getById(id) {
    debugger;
    return this.http.get(`${this.rootUrl + this.url}/${id}`)
      .map(res => res)
      .catch(this.handleError);
  }

  handleError(error: any) {
    if (error.status === 400) {
      return Observable.throw(new BadInputError(error));
    } else if (error.status === 401) {
      this.router.navigate(['/login']);
      return Observable.throw(new UnauthorizedError(error));
    } else if (error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    } else if (error.status === 500) {
      return Observable.throw(new InternalError(error));
    }
    return Observable.throw(new AppError(error));
  }
}
