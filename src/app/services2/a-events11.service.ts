import {EventEmitter, Injectable, Output} from '@angular/core';
import {AEvent, AEventStatus} from '../models/a-event.model';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SessionService} from '../services/session-service';

@Injectable({
  providedIn: 'root'
})
export class AEvents11Service {
  aEventsEmit = new EventEmitter<AEvent[]>();
  readonly dataStorageUrl: string;
  public aEvents: AEvent[];
  public editedChangesDetection = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.dataStorageUrl = 'http://localhost:8084/aevents';
    this.aEvents = [];
    this.loadAllAEvents();
  }

  transmitAEvents() {
    this.aEventsEmit.emit(this.aEvents);
  }

  detectChanges(status: boolean) {
    this.editedChangesDetection.emit(status);
  }

  add(aEvent: AEvent): number {
    this.aEvents.push(aEvent);
    this.aEventsEmit.emit(this.aEvents);
    this.saveAllAEvents();
    return this.aEvents.indexOf(aEvent);
  }

  update(aIdx: number, aEvent: AEvent) {
    this.aEvents[aIdx] = aEvent;
    this.aEventsEmit.emit(this.aEvents);
    this.saveAllAEvents();
  }

  remove(eIdx: number) {
    this.aEvents.splice(eIdx, 1);
    this.aEventsEmit.emit(this.aEvents);
    this.saveAllAEvents();
  }

  saveAllAEvents() {
    console.log(this.aEvents);
    this.httpClient.put<AEvent[]>(this.dataStorageUrl, this.aEvents)
      .subscribe(
        (aEvents: AEvent[]) => {
          console.log(aEvents);
        },
        (error) => {
          if (error.status == 401) {
            alert('You are not authorized. Please log in.');
          } else {
            alert(error.message);
          }
        }
      );
  }

  loadAllAEvents() {
    this.httpClient.get<AEvent[]>(this.dataStorageUrl)
      .subscribe(
        (aEvents: AEvent[]) => {
          if (aEvents != null && aEvents.length > 0) {
            this.aEvents = aEvents;
          } else {
            for (let i = 0; i < 5; i++) {
              this.addRandomEvent();
            }
            this.saveAllAEvents();
          }
          this.aEventsEmit.emit(this.aEvents);
        },
        (error) => {
          alert(error.message);
        }
      );
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
    this.add(eventAdded);
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
