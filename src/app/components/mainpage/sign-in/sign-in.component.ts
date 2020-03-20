import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SessionService} from '../../../services/session-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.sessionService.signIn(username, password);
  }

}
