import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionService} from './services/session-service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*    const token = this.session.getToken();
    if (token) {
      const copiedReq = req.clone({params: req.params.set('auth', token)});
      return next.handle(copiedReq);
    } else {
      return next.handle(req);
    }*/
    console.log(req);
    return next.handle(req);
  }
}
