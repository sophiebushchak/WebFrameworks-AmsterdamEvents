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
    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.addRandomEvent();
    }
  }

  addRandomEvent(): AEvent {
    const defaultTitle = 'The Fantastic Event ' + this.aEvents.length;
    const status: AEventStatus = this.randomEnum();
    const isTicketed: boolean = Math.random() >= 0.5;
    let theParticipationFee: number;
    let theMaxParticipants: number;
    if (isTicketed) {
      theParticipationFee = Math.floor((Math.random() * 14) + 1);
      theMaxParticipants = Math.round(((Math.random() * 10000) + 100) / 10) * 10;
    } else {
      theParticipationFee = 0;
      theMaxParticipants = 0;
    }
    const startDate: Date = this.randomDate(new Date(2019, 5, 0, 0, 0),
      new Date(2019, 5, 13, 0, 0));
    const endDate: Date = this.randomDate(new Date(2019, 6, 14, 0, 0),
      new Date(2019, 6, 25, 0, 0));
    const eventAdded: AEvent = new AEvent(defaultTitle, 'An event', status, isTicketed, theParticipationFee, theMaxParticipants,
      startDate, endDate);
    this.aEvents.push(eventAdded);
    return eventAdded;
  }

  randomDate(fromDate: Date, toDate: Date): Date {
    return new Date(fromDate.getTime() + Math.random() * (toDate.getTime() - fromDate.getTime()));
  }

  randomEnum(): AEventStatus {
    const aNumber = Math.floor(Math.random() * 3);
    console.log(aNumber);
    switch (aNumber) {
      case 0:
        return AEventStatus.PUBLISHED;
      case 1:
        return AEventStatus.DRAFT;
      case 2:
        return AEventStatus.CANCELLED;
    }
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
