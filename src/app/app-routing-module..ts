import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/mainpage/home/home.component';
import {Overview1Component} from './components/events/overview1/overview1.component';
import {Overview2Component} from './components/events/overview2/overview2.component';
import {Overview3Component} from './components/events/overview3/overview3.component';
import {ErrorComponent} from './components/mainpage/error/error.component';
import {Overview4Component} from './components/events/overview4/overview4.component';
import {Detail4Component} from './components/events/detail4/detail4.component';
import {Detail42Component} from './components/events/detail42/detail42.component';
import {Overview6Component} from './components/events/overview6/overview6.component';
import {Detail6Component} from './components/events/detail6/detail6.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'events/overview1', component: Overview1Component},
  {path: 'events/overview2', component: Overview2Component},
  {path: 'events/overview3', component: Overview3Component},
  { path: 'events/overview4', component: Overview4Component, children: [
      {path: 'edit', component: Detail4Component}
    ]
  },
  { path: 'events/overview42', component: Overview4Component, children: [
      {path: 'edit', component: Detail42Component}
    ]
  },
  { path: 'events/overview6', component: Overview6Component, children: [
      {path: 'edit', component: Detail6Component}
    ]
  },
  {path: 'not-found', component: ErrorComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
