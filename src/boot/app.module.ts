import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { AuthGuard } from '../shared/auth.guard';
import { Auth0CallbackGuard } from '../shared/auth0.guard';
import { BotService }         from '../shared/bot.service';
import { Auth } from '../shared/auth.service';
import { GmailService } from '../shared/gmail.service';
import { FbService } from '../shared/fb.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AppRoutingModule }     from '../routing/app.routing.module';
import { AppComponent }        from '../app/app.component';
import { LandingPageComponent }   from '../landing-page/landing-page.component';
import { GmailLoginComponent }    from '../gmail-login/gmail-login.component';
import { SetupComponent }    from '../setup/setup.component';
import { ManageComponent }    from '../manage/manage.component';
import { ContactComponent }    from '../contact/contact.component';
import { HomePageComponent } from '../home-page/home.component';
import { SearchComponent } from '../search/search.component';
import { FilterContacts } from '../search/contact.pipe';
import { LoadingComponent } from '../loading/loading.component';

import { Store } from '../shared/store';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    HomePageComponent,
    AppComponent,
    LandingPageComponent,
    GmailLoginComponent,
    SetupComponent,
    ManageComponent,
    ContactComponent,
    SearchComponent,
    FilterContacts,
    LoadingComponent
  ],
  providers: [
    { provide: 'Window',  useValue: window },
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    BotService,
    Auth,
    Store,
    GmailService,
    FbService,
    AuthGuard,
    Auth0CallbackGuard,
    AUTH_PROVIDERS
  ],
  bootstrap: [ AppComponent ],
  //entryComponents: [ CustomModal ]
})
export class AppModule {
}


