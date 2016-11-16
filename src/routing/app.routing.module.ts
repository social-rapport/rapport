import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent}   from '../landing-page/landing-page.component';
import {SetupComponent}   from '../setup/setup.component';
import {ManageComponent}   from '../manage/manage.component';
import {Auth0CallbackGuard} from '../shared/auth0.guard';
import {AuthGuard} from '../shared/auth.guard';
import { HomePageComponent } from '../home-page/home.component';
import { SearchComponent } from '../search/search.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'search', component: SearchComponent },
  { path: 'setup', canActivate:[AuthGuard], component: SetupComponent,},
  { path: 'manage', canActivate: [AuthGuard], component: ManageComponent },
  { path: 'logout', redirectTo: '', pathMatch: 'full' },

  // { path: 'detail/:id', component: HeroDetailComponent },
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard,
  ],
})
export class AppRoutingModule {}
