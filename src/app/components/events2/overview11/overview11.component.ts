import {Component, OnDestroy, OnInit} from '@angular/core';
import {AEvent} from '../../../models/a-event.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AEvents11Service} from '../../../services2/a-events11.service';

@Component({
  selector: 'app-overview11',
  templateUrl: './overview11.component.html',
  styleUrls: ['./overview11.component.css']
})
export class Overview11Component implements OnInit, OnDestroy {
  aEvents: AEvent[] = [];
  selectedAEventIndex: number;
  private queryParamsSubscription: Subscription = null;
  private detectChangesSubscription: Subscription;
  private aEventsSubscription: Subscription;
  unsavedChanges: boolean;

  constructor(public aEventsService: AEvents11Service, private router: Router, private activatedRoute: ActivatedRoute) {
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
    this.aEventsService.loadAllAEvents();
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
