import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AEvent} from '../../../models/a-event.model';
import {AEventsService} from '../../../services/a-events.service';
import * as _ from 'lodash';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: ['./overview4.component.css']
})
export class Overview4Component implements OnInit, OnDestroy {
  aEvents: AEvent[] = [];
  selectedAEventIndex: number;
  private queryParamsSubscription: Subscription = null;

  constructor(public aEventsService: AEventsService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.aEvents = this.aEventsService.aEvents;
    this.queryParamsSubscription =
      this.activatedRoute.queryParams
        .subscribe((params: Params) => {
          console.log(params['id']);
          console.log(this.aEvents.length);
          if (params['id'] < this.aEvents.length) {
            this.selectedAEventIndex = params['id'];
          } else {
            this.selectedAEventIndex = null;
            this.router.navigate(['./'], {relativeTo: this.activatedRoute});
          }

        });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  onSelected(index: number) {
    if (this.selectedAEventIndex != null) {
      if (!_.isEqual(this.aEventsService.aEventCopy, this.aEventsService.aEvents[this.selectedAEventIndex])) {
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
    const newEvent = new AEvent(null, null, null, false, null, null, new Date(), null);
    this.aEventsService.aEvents.push(newEvent);
    this.onSelected(this.aEventsService.aEvents.indexOf(newEvent));
  }

  isElementActive(index: number): boolean {
    return this.selectedAEventIndex == index;
  }
}
