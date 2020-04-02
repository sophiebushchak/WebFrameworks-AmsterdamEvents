import {EventEmitter, Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../models2/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  readonly REST_BASE_URL: string;
  private currentUser: User;
  public currentUserEmitter = new EventEmitter<User>();
  public currentToken: string;

  jwtService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
    this.REST_BASE_URL = 'http://localhost:8084/';
    this.updateUserInformation();
    console.log(this.currentUser);
  }

  public signIn(eMail: string, passWord: string) {
    const observable = this.httpClient.post(this.REST_BASE_URL + '/authenticate/login', {
      email: eMail,
      password: passWord
    }, {observe: 'response'}).pipe(share());

    observable.subscribe(
      data => {
        console.log('logged in' + data);
        let token = data.headers.get('Authorization');

        if (token == null) {
          throw new Error('Token was not present in the response');
        }

        token = token.replace('Bearer ', '');

        sessionStorage.setItem('token', token);

        this.updateUserInformation();
      },
      error => {
        console.log('Authentication error: ' + error);
        this.currentUser = null;
        this.currentToken = null;
      }
    );
    return observable;
  }

  transmitUser() {
    this.currentUserEmitter.emit(this.currentUser);
  }

  public signOut() {
    sessionStorage.removeItem('token');
    this.updateUserInformation();
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }

    const expirationDate: number = this.jwtService.getTokenExpirationDate(this.currentToken).getTime();
    const currentTime: number = new Date().getTime();

    return expirationDate > currentTime;
  }

  private updateUserInformation() {
    this.currentToken = sessionStorage.getItem('token');

    if (this.currentToken) {
      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      this.currentUser = new User();
      this.currentUser.name = decodedToken.sub;
      this.currentUser.id = decodedToken.id;
      this.currentUser.admin = decodedToken.admin;

    } else {
      this.currentUser = null;
    }
    this.currentUserEmitter.emit(this.currentUser);
  }


}
