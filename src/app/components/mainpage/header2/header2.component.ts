import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from '../../../services/session-service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  signedInUsername: string;
  signedInUsernameSubscription: Subscription;

  constructor(public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.signedInUsernameSubscription =
      this.sessionService.usernameEmitter.subscribe(
        (username: string) => {
          this.signedInUsername = username;
        }
      );
  }

  retrieveDate(): string {
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
      'December'];
    const date = new Date();
    return weekday[date.getDay()] + ', ' + (date.getDay() + 1) + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

}
