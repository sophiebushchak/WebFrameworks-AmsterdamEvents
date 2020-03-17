import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AEvent} from '../../../models/a-event.model';
import {AEventsService} from '../../../services/a-events.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit, OnChanges, DoCheck {
  @Input() editedAEventId: number;
  @Output() editedAEventIdChange = new EventEmitter<number>();
  @Output() unsavedChanges = new EventEmitter<boolean>();

  constructor(public aEventsService: AEventsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
      this.retrieveCopy();
  }

  ngDoCheck() {
    this.unsavedChanges.emit(this.detectUnsavedChanges());
  }

  onSave() {
    this.aEventsService.update(this.editedAEventId, this.aEventsService.aEventCopy);
    this.editedAEventId = null;
    this.editedAEventIdChange.emit(this.editedAEventId);
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.aEventsService.remove(this.editedAEventId);
      this.editedAEventId = null;
      this.editedAEventIdChange.emit(this.editedAEventId);
    }
  }

  onClear() {
    if (this.detectUnsavedChanges()) {
      if (confirm('Discard unsaved changes?')) {
        this.aEventsService.aEventCopy.title = null;
        this.aEventsService.aEventCopy.description = null;
        this.aEventsService.aEventCopy.status = null;
        this.aEventsService.aEventCopy.isTicketed = false;
        this.aEventsService.aEventCopy.participationFee = null;
        this.aEventsService.aEventCopy.maxParticipants = null;
      }
    } else {
      this.aEventsService.aEventCopy.title = null;
      this.aEventsService.aEventCopy.description = null;
      this.aEventsService.aEventCopy.status = null;
      this.aEventsService.aEventCopy.isTicketed = false;
      this.aEventsService.aEventCopy.participationFee = null;
      this.aEventsService.aEventCopy.maxParticipants = null;
    }
  }

  onReset() {
    if (this.detectUnsavedChanges()) {
      if (confirm('Discard unsaved changes?')) {
        this.retrieveCopy();
      }
    }
  }

  onCancel() {
    if (this.detectUnsavedChanges()) {
      if (confirm('Discard unsaved changes?')) {
        this.editedAEventId = null;
        this.editedAEventIdChange.emit(this.editedAEventId);
      }
    } else {
      this.editedAEventId = null;
      this.editedAEventIdChange.emit(this.editedAEventId);
    }
  }

  detectUnsavedChanges(): boolean {
    return (!_.isEqual(this.aEventsService.aEventCopy, this.aEventsService.aEvents[this.editedAEventId]));
  }

  retrieveCopy() {
    this.aEventsService.aEventCopy = new AEvent(this.aEventsService.aEvents[this.editedAEventId].title,
      this.aEventsService.aEvents[this.editedAEventId].description, this.aEventsService.aEvents[this.editedAEventId].status,
      this.aEventsService.aEvents[this.editedAEventId].isTicketed, this.aEventsService.aEvents[this.editedAEventId].participationFee,
      this.aEventsService.aEvents[this.editedAEventId].maxParticipants, this.aEventsService.aEvents[this.editedAEventId].start,
      this.aEventsService.aEvents[this.editedAEventId].end);
  }
}
