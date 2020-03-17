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
  unsavedChanges: boolean;

  constructor(public aEventsService: AEventsService) {
  }

  ngOnInit(): void {
    this.aEvents = this.aEventsService.aEvents;
  }

  onSelected(aEvent: AEvent) {
    if (this.selectedAEventIndex != null) {
      if (this.unsavedChanges) {
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

  detectUnsavedChanges(unsavedChanges: boolean) {
    this.unsavedChanges = unsavedChanges;
  }

  onAddEvent() {
    const newEvent = new AEvent(null, null, null, false, null, null, new Date(), null);
    this.aEventsService.add(newEvent);
    this.selectedAEventIndex = this.aEventsService.aEvents.indexOf(newEvent);
  }
}
