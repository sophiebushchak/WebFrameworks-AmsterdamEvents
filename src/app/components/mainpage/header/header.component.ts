import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
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
