import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthService } from '../../services/authentication/auth.service';
import { BadInputError } from '../../services/data-service/bad-input-error';
import { UnauthorizedError } from '../../services/data-service/unauthorized-error';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenId = this.authService.getToken();

    if (tokenId) {
      const newRequest = req.clone({
        // headers: req.headers.set('Content-Type', 'application/json')
        headers: req.headers.set('Authorization', 'Bearer ' + tokenId)
      });
      
      return next.handle(newRequest).catch(this.handleError)
    } else {
      return next.handle(req);
    }
    
  }
  handleError(error: any) {
    if (error.status === 401) {
      return Observable.throw(new UnauthorizedError(error));
    }
  }
} 