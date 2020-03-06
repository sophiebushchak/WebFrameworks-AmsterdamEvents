import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AEvent, AEventStatus} from '../../../models/a-event.model';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})
export class Overview2Component implements OnInit {
  aEvents: AEvent[];
  aEventSelected: AEvent;

  constructor() {
  }

  ngOnInit(): void {
    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.addRandomEvent();
    }
  }

  onSelected(aEvent: AEvent) {
    this.aEventSelected = aEvent;
  }

  onAddEvent() {
    const newEvent = new AEvent(null, null, null, false, 0, 0, new Date(), null);
    this.aEvents.push(newEvent);
    this.aEventSelected = newEvent;
  }

  onAEventSaved(aEventData: AEvent) {
    console.log(this.aEvents);
    this.aEvents[this.aEvents.indexOf(this.aEventSelected)] = aEventData;
    this.aEventSelected = null;
  }

  onAEventDeleted(aEventData: AEvent) {
    console.log(aEventData);
    this.aEvents.splice(this.aEvents.indexOf(aEventData), 1);
    this.aEventSelected = null;
  }

  addRandomEvent(): AEvent {
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
    const endDate: Date = this.randomDate(new Date(2019, 5, 14, 0, 0),
      new Date(2019, 6, 25, 0, 0));
    const eventAdded: AEvent = new AEvent('The Fantastic Event', 'An event', status, isTicketed, theParticipationFee, theMaxParticipants,
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
}
