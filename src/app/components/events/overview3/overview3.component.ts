import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AEvent} from '../../../models/a-event.model';
import {AEventsService} from '../../../services/a-events.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css']
})
export class Overview3Component implements OnInit {
  aEvents: AEvent[] = [];
  @Input() selectedAEventIndex: number;

  constructor(public aEventsService: AEventsService) {
  }

  ngOnInit(): void {
    this.aEvents = this.aEventsService.aEvents;
  }

  onSelected(aEvent: AEvent) {
    if (this.selectedAEventIndex != null) {
      if (!_.isEqual(this.aEventsService.aEventCopy, this.aEventsService.aEvents[this.selectedAEventIndex])) {
        if (confirm('Discard all changes?')) {
          this.selectedAEventIndex = this.aEventsService.aEvents.indexOf(aEvent);
        }
      } else {
        this.selectedAEventIndex = this.aEventsService.aEvents.indexOf(aEvent);
      }
    } else {
      this.selectedAEventIndex = this.aEventsService.aEvents.indexOf(aEvent);
    }
  }

  onAddEvent() {
    const newEvent = new AEvent(null, null, null, false, null, null, new Date(), null);
    this.aEventsService.aEvents.push(newEvent);
    this.selectedAEventIndex = this.aEventsService.aEvents.indexOf(newEvent);
  }
}
