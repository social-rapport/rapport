
import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from '../app/app.component';
import { HeroDetailComponent } from '../detail/hero-detail.component';
import { HeroesComponent }     from '../heroes/heroes.component';
import { HeroService }         from '../shared/hero.service';
import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { AppRoutingModule }     from '../routing/app.routing.module';
import {LandingPageComponent}   from '../landing-page/landing-page.component';
import {GmailLoginComponent}    from '../gmail-login/gmail-login.component';
import { HttpModule }    from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    LandingPageComponent,
    GmailLoginComponent,
  ],
  providers: [
    { provide: 'Window',  useValue: window },
    HeroService,
    AUTH_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}


