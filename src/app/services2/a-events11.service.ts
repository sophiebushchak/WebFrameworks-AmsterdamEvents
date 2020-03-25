import {EventEmitter, Injectable, Output} from '@angular/core';
import {AEvent, AEventStatus} from '../models2/a-event.model';
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
    return this.aEvents.indexOf(aEvent);
  }

  update(aIdx: number, aEvent: AEvent) {
    this.aEvents[aIdx] = aEvent;
    this.aEventsEmit.emit(this.aEvents);
  }

  remove(eIdx: number) {
    this.aEvents.splice(eIdx, 1);
    this.aEventsEmit.emit(this.aEvents);
  }

  postAEvent(aEvent: AEvent) {
    return this.httpClient.post<AEvent>(this.dataStorageUrl, aEvent);
  }

  deleteAEvent(id: bigint) {
    return this.httpClient.delete(this.dataStorageUrl + '/' + id);
  }

  saveAEvent(aEvent: AEvent, id: bigint) {
    return this.httpClient.put(this.dataStorageUrl + '/' + id, aEvent);
  }

  loadAllAEvents() {
    this.httpClient.get<AEvent[]>(this.dataStorageUrl)
      .subscribe(
        (aEvents: AEvent[]) => {
          if (aEvents != null && aEvents.length > 0) {
            this.aEvents = aEvents;
          }
          this.aEventsEmit.emit(this.aEvents);
        },
        (error) => {
          alert(error.message);
        }
      );
  }
}
