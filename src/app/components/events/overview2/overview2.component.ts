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
}
