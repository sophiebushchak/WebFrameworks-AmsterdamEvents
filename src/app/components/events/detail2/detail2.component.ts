import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AEvent} from '../../../models/a-event.model';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit, OnChanges {
  @Output() aEventDeleted = new EventEmitter<AEvent>();
  @Output() aEventSaved = new EventEmitter<AEvent>();
  @Input() aEvent: AEvent;
  aEventCopy: AEvent;

  constructor() {
  }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.aEventCopy = new AEvent(this.aEvent.title, this.aEvent.description, this.aEvent.status, this.aEvent.isTicketed,
      this.aEvent.participationFee, this.aEvent.maxParticipants, this.aEvent.start, this.aEvent.end);
  }

  onEventSaved() {
    this.aEventSaved.emit(this.aEventCopy);
  }


  onDelete() {
    this.aEventDeleted.emit(this.aEvent);
  }


}
