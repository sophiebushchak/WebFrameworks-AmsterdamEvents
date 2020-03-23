import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { Overview1Component } from './components/events/overview1/overview1.component';
import { Overview2Component } from './components/events/overview2/overview2.component';
import { Detail2Component } from './components/events/detail2/detail2.component';
import {FormsModule} from '@angular/forms';
import { Detail3Component } from './components/events/detail3/detail3.component';
import { Overview3Component } from './components/events/overview3/overview3.component';
import {AEventsService} from './services/a-events.service';
import {AppRoutingModule} from './app-routing-module.';
import { ErrorComponent } from './components/mainpage/error/error.component';
import { Overview4Component } from './components/events/overview4/overview4.component';
import { Detail4Component } from './components/events/detail4/detail4.component';
import { Detail42Component } from './components/events/detail42/detail42.component';
import { Overview6Component } from './components/events/overview6/overview6.component';
import { Detail6Component } from './components/events/detail6/detail6.component';
import {AEvents2Service} from './services/a-events2.service';
import { AppFbComponent } from './app-fb/app-fb.component';
import { Header2Component } from './components/mainpage/header2/header2.component';
import {SessionService} from './services/session-service';
import { SignInComponent } from './components/mainpage/sign-in/sign-in.component';
import { NavBar2Component } from './components/mainpage/nav-bar2/nav-bar2.component';
import {AuthInterceptor} from './auth-interceptor';
import { Overview11Component } from './components/events2/overview11/overview11.component';
import { Detail11Component } from './components/events2/detail11/detail11.component';
import {AEvents11Service} from './services2/a-events11.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    Detail2Component,
    Detail3Component,
    Overview3Component,
    ErrorComponent,
    Overview4Component,
    Detail4Component,
    Detail42Component,
    Overview6Component,
    Detail6Component,
    AppFbComponent,
    Header2Component,
    SignInComponent,
    NavBar2Component,
    Overview11Component,
    Detail11Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AEventsService,
    AEvents2Service,
    SessionService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AEvents11Service
    ],
  bootstrap: [AppFbComponent]
})
export class AppModule { }
