import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionService} from './services/session-service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {share} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (token) {

      const headersConfig = {
        Authorization: 'Bearer ' + token
      };

      const copiedReq = req.clone({
        setHeaders: headersConfig
      });
      const observable = next.handle(copiedReq).pipe(share());

      observable.subscribe((data) => {
        console.log('intercepting response', data);
      }, (error) => {
        console.error('error in interceptor:', error);
      });

      return observable;
    } else {
      return next.handle(req);
    }
  }
}
