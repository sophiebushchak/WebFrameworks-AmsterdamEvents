import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session-service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.css']
})
export class NavBar2Component implements OnInit {
  constructor(public sessionService: SessionService, public router: Router) {
  }

  ngOnInit(): void {
  }

  isSignedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  signOut() {
    this.sessionService.signOut();
    this.router.navigate(['/']);
  }
}
