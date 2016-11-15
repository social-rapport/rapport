import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AUTH_PROVIDERS }      from 'angular2-jwt';
import {AuthGuard} from '../shared/auth.guard';
import {Auth0CallbackGuard} from '../shared/auth0.guard';
import { BotService }         from '../shared/bot.service';
import {Auth} from '../shared/auth.service';

import { AppRoutingModule }     from '../routing/app.routing.module';
import { AppComponent }        from '../app/app.component';
import {LandingPageComponent}   from '../landing-page/landing-page.component';
import {GmailLoginComponent}    from '../gmail-login/gmail-login.component';
import {SetupComponent}    from '../setup/setup.component';
import {ManageComponent}    from '../manage/manage.component';
import {ContactComponent}    from '../contact/contact.component';
import { HomePageComponent } from '../home-page/home.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
  ],
  declarations: [
    HomePageComponent,
    AppComponent,
    LandingPageComponent,
    GmailLoginComponent,
    SetupComponent,
    ManageComponent,
    ContactComponent,
  ],
  providers: [
    { provide: 'Window',  useValue: window },
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    BotService,
    Auth,
    AuthGuard,
    Auth0CallbackGuard,
    AUTH_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}


