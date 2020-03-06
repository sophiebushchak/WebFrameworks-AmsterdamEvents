import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  badRoute: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.badRoute = this.route.snapshot.toString();
  }

}
