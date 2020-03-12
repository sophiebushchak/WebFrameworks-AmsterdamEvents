import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AEventsService} from '../../../services/a-events.service';
import {AEvent} from '../../../models/a-event.model';
import * as _ from 'lodash';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnDestroy {
  public editedAEventId: number;
  private queryParamsSubscription: Subscription = null;

  constructor(public aEventsService: AEventsService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('detail4 init');
    this.queryParamsSubscription =
      this.activatedRoute.queryParams
        .subscribe(
          (params: Params) => {
            console.log(params['id']);
            this.editedAEventId = params['id'];
            this.retrieveCopy(this.editedAEventId);
          }
        );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  onSave() {
    this.aEventsService.update(this.editedAEventId, this.aEventsService.aEventCopy);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.aEventsService.remove(this.editedAEventId);
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
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
        this.retrieveCopy(this.editedAEventId);
      }
    }
  }

  onCancel() {
    if (this.detectUnsavedChanges()) {
      if (confirm('Discard unsaved changes?')) {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    } else {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
  }

  detectUnsavedChanges(): boolean {
    return (!_.isEqual(this.aEventsService.aEventCopy, this.aEventsService.aEvents[this.editedAEventId]));
  }

  retrieveCopy(editedAEventId: number) {
    this.aEventsService.aEventCopy = new AEvent(this.aEventsService.aEvents[editedAEventId].title,
      this.aEventsService.aEvents[editedAEventId].description, this.aEventsService.aEvents[editedAEventId].status,
      this.aEventsService.aEvents[editedAEventId].isTicketed, this.aEventsService.aEvents[editedAEventId].participationFee,
      this.aEventsService.aEvents[editedAEventId].maxParticipants, this.aEventsService.aEvents[editedAEventId].start,
      this.aEventsService.aEvents[editedAEventId].end);
  }
}
