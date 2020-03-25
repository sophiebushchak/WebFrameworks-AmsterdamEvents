import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AEvents11Service} from '../../../services2/a-events11.service';
import {AEvent} from '../../../models2/a-event.model';

@Component({
  selector: 'app-detail11',
  templateUrl: './detail11.component.html',
  styleUrls: ['./detail11.component.css']
})
export class Detail11Component implements OnInit, DoCheck, OnDestroy {
  @ViewChild('eventForm') eventForm: NgForm;
  public editedAEventId: number;
  public editedAEvent: AEvent;
  private queryParamsSubscription: Subscription = null;

  constructor(public aEventsService: AEvents11Service, private router: Router, private activatedRoute: ActivatedRoute) {
    this.queryParamsSubscription =
      this.activatedRoute.queryParams
        .subscribe(
          (params: Params) => {
            this.editedAEventId = params['id'];
            this.editedAEvent = new AEvent(
              this.aEventsService.aEvents[this.editedAEventId].id,
              this.aEventsService.aEvents[this.editedAEventId].title,
              this.aEventsService.aEvents[this.editedAEventId].description,
              this.aEventsService.aEvents[this.editedAEventId].status,
              this.aEventsService.aEvents[this.editedAEventId].isTicketed,
              this.aEventsService.aEvents[this.editedAEventId].participationFee,
              this.aEventsService.aEvents[this.editedAEventId].maxParticipants,
              this.aEventsService.aEvents[this.editedAEventId].start,
              this.aEventsService.aEvents[this.editedAEventId].end,
            );
            console.log(this.editedAEvent);
            if (this.eventForm != null) {
              this.eventForm.form.reset();
              this.eventForm.form.patchValue(this.aEventsService.aEvents[this.editedAEventId]);
            }
          }
        );
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.aEventsService.editedChangesDetection.emit(this.detectUnsavedChanges());
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  onSave() {
    this.editedAEvent.title = this.eventForm.value.title;
    this.editedAEvent.description = this.eventForm.value.description;
    this.editedAEvent.status = this.eventForm.value.status;
    this.editedAEvent.isTicketed = this.eventForm.value.isTicketed;
    if (this.eventForm.value.participationFee != null && this.eventForm.value.maxParticipants != null) {
      this.editedAEvent.participationFee = this.eventForm.value.participationFee;
      this.editedAEvent.maxParticipants = this.eventForm.value.maxParticipants;
    } else {
      this.editedAEvent.participationFee = 0;
      this.editedAEvent.maxParticipants = 0;
    }
    console.log(this.editedAEvent);
    this.aEventsService.saveAEvent(this.editedAEvent, this.editedAEvent.id).subscribe(
      () => {
        this.aEventsService.update(this.editedAEventId, this.editedAEvent);
        this.eventForm.form.reset();
        this.eventForm.form.patchValue(this.aEventsService.aEvents[this.editedAEventId]);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.aEventsService.deleteAEvent(this.aEventsService.aEvents[this.editedAEventId].id).subscribe(
        () => {
          this.aEventsService.remove(this.editedAEventId);
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  onClear() {
    if (this.detectUnsavedChanges()) {
      if (confirm('Discard unsaved changes?')) {
        this.eventForm.setValue(
          {
            title: null,
            description: null,
            status: null,
            isTicketed: false,
            participationFee: 0,
            maxParticipants: 0
          }
        );
        this.eventForm.form.markAsDirty();
      }
    } else {
      this.eventForm.setValue(
        {
          title: null,
          description: null,
          status: null,
          isTicketed: false,
          participationFee: 0,
          maxParticipants: 0
        }
      );
      this.eventForm.form.markAsDirty();
    }
  }

  onReset() {
    if (this.detectUnsavedChanges()) {
      if (confirm('Discard unsaved changes?')) {
        this.eventForm.form.reset();
        this.eventForm.form.patchValue(this.aEventsService.aEvents[this.editedAEventId]);
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
    if (this.eventForm != null) {
      return this.eventForm.dirty;
    }
  }


}
