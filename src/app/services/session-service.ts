import {EventEmitter, Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public username: string;
  public usernameEmitter = new EventEmitter<string>();
  private token: string;

  public signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.username = email;
          this.usernameEmitter.emit(this.username);
        }
      ).catch(
      (error) => {
        alert(error.message);
      }
    );
  }

  public signOut() {
    firebase.auth().signOut()
      .then(
        (response) => console.log(response)
      );
    this.username = null;
    this.usernameEmitter.emit(this.username);
  }

  getToken() {
    if (this.username != null) {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
    } else {
      this.token = null;
    }
    return this.token;
  }

  constructor() {
  }


}
