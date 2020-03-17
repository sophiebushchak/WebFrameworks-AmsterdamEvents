import {EventEmitter, Injectable} from '@angular/core';
import {AEvent, AEventStatus} from '../models/a-event.model';

@Injectable({
  providedIn: 'root'
})
export class AEventsService {
  public aEvents: AEvent[];
  public aEventCopy: AEvent;
  public editedChangesDetection = new EventEmitter<boolean>();

  constructor() {
    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.addRandomEvent();
    }
  }

  detectChanges(status: boolean) {
    this.editedChangesDetection.emit(status);
  }

  add(aEvent: AEvent): number {
    this.aEvents.push(aEvent);
    return this.aEvents.indexOf(aEvent);
  }

  update(aIdx: number, aEvent: AEvent) {
    this.aEvents[aIdx] = aEvent;
  }

  remove(eIdx: number) {
    this.aEvents.splice(eIdx, 1);
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
    const endDate: Date = this.randomDate(new Date(2019, 5, 14, 0, 0),
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
}
