import {Component, OnInit} from '@angular/core';
import {AEvent, AEventStatus} from '../../../models/a-event.model';

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: ['./overview1.component.css']
})
export class Overview1Component implements OnInit {
  public aEvents: AEvent[];

  constructor() {
  }

  ngOnInit(): void {
  }

  retrieveDate(date: Date): string {
    const weekday = new Array(7);
    weekday[0] = 'Sun';
    weekday[1] = 'Mon';
    weekday[2] = 'Tue';
    weekday[3] = 'Wed';
    weekday[4] = 'Thu';
    weekday[5] = 'Fri';
    weekday[6] = 'Sat';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
      'Dec'];
    date.setMinutes(0);
    date.setSeconds(0);
    return weekday[date.getDay()] + ', ' + (date.getDay() + 1) + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' ' +
      date.toTimeString().split(' ')[0];
  }
}
