import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AEvent} from '../../../models/a-event.model';
import {Subscription} from 'rxjs';
import {AEventsService} from '../../../services/a-events.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AEvents2Service} from '../../../services/a-events2.service';

@Component({
  selector: 'app-overview6',
  templateUrl: './overview6.component.html',
  styleUrls: ['./overview6.component.css']
})
export class Overview6Component implements OnInit, OnDestroy {
  aEvents: AEvent[] = [];
  selectedAEventIndex: number;
  private queryParamsSubscription: Subscription = null;
  private detectChangesSubscription: Subscription;
  private aEventsSubscription: Subscription;
  unsavedChanges: boolean;

  constructor(public aEventsService: AEvents2Service, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.aEventsSubscription =
      this.aEventsService.aEventsEmit.subscribe(
        (aEvents: AEvent[]) => {
          this.aEvents = aEvents;
        }
      );
    this.queryParamsSubscription =
      this.activatedRoute.queryParams
        .subscribe((params: Params) => {
          if (params['id'] < this.aEvents.length) {
            this.selectedAEventIndex = params['id'];
          } else {
            this.selectedAEventIndex = null;
            this.router.navigate(['./'], {relativeTo: this.activatedRoute});
          }
        });
    this.detectChangesSubscription =
      this.aEventsService.editedChangesDetection.subscribe(
        (value: boolean) => {
          this.unsavedChanges = value;
        }
      );
    this.aEventsService.transmitAEvents();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
    this.detectChangesSubscription.unsubscribe();
    this.aEventsSubscription.unsubscribe();
  }

  onSelected(index: number) {
    if (this.selectedAEventIndex != null) {
      if (this.unsavedChanges) {
        if (confirm('Discard all changes?')) {
          this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: index}});
        }
      } else {
        this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: index}});
      }
    } else {
      this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: index}});
    }
  }

  onAddEvent() {
    const newEvent = new AEvent(null, null, null, false, 0, 0, new Date(), null);
    this.aEvents.push(newEvent);
    this.onSelected(this.aEvents.indexOf(newEvent));
  }

  isElementActive(index: number): boolean {
    return this.selectedAEventIndex == index;
  }
}
