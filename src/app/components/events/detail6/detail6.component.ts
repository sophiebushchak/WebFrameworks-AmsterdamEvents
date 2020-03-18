import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AEventsService} from '../../../services/a-events.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AEvents2Service} from '../../../services/a-events2.service';

@Component({
  selector: 'app-detail6',
  templateUrl: './detail6.component.html',
  styleUrls: ['./detail6.component.css']
})
export class Detail6Component implements OnInit, DoCheck, OnDestroy {
  @ViewChild('eventForm') eventForm: NgForm;
  public editedAEventId: number;
  private queryParamsSubscription: Subscription = null;

  constructor(public aEventsService: AEvents2Service, private router: Router, private activatedRoute: ActivatedRoute) {
    this.queryParamsSubscription =
      this.activatedRoute.queryParams
        .subscribe(
          (params: Params) => {
            this.editedAEventId = params['id'];
            console.log(this.aEventsService.aEvents[this.editedAEventId]);
            if (this.eventForm != null) {
              this.resetFieldsAndValidation();
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
    this.aEventsService.aEvents[this.editedAEventId].title = this.eventForm.value.title;
    this.aEventsService.aEvents[this.editedAEventId].description = this.eventForm.value.description;
    this.aEventsService.aEvents[this.editedAEventId].status = this.eventForm.value.status;
    this.aEventsService.aEvents[this.editedAEventId].isTicketed = this.eventForm.value.isTicketed;
    if (this.eventForm.value.participationFee != null && this.eventForm.value.maxParticipants != null) {
      this.aEventsService.aEvents[this.editedAEventId].participationFee = this.eventForm.value.participationFee;
      this.aEventsService.aEvents[this.editedAEventId].maxParticipants = this.eventForm.value.maxParticipants;
    } else {
      this.aEventsService.aEvents[this.editedAEventId].participationFee = 0;
      this.aEventsService.aEvents[this.editedAEventId].maxParticipants = 0;
    }
    console.log(this.aEventsService.aEvents[this.editedAEventId]);
    console.log(this.aEventsService.saveAllAEvents());
    this.resetFieldsAndValidation();
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
        this.resetFieldsAndValidation();
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

  resetFieldsAndValidation() {
    this.eventForm.reset();
    this.eventForm.setValue(
      {
        title: this.aEventsService.aEvents[this.editedAEventId].title,
        description: this.aEventsService.aEvents[this.editedAEventId].description,
        status: this.aEventsService.aEvents[this.editedAEventId].status,
        isTicketed: this.aEventsService.aEvents[this.editedAEventId].isTicketed,
        participationFee: this.aEventsService.aEvents[this.editedAEventId].participationFee,
        maxParticipants: this.aEventsService.aEvents[this.editedAEventId].maxParticipants
      }
    );
  }


  detectUnsavedChanges(): boolean {
    if (this.eventForm != null) {
      return this.eventForm.dirty;
    }
  }
}
