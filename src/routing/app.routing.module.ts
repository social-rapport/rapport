import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { HeroesComponent }      from '../heroes/heroes.component';
import { HeroDetailComponent }  from '../detail/hero-detail.component';
import {LandingPageComponent}   from '../landing-page/landing-page.component';
import {SetupComponent}   from '../setup/setup.component';
import {ManageComponent}   from '../manage/manage.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'setup', component: SetupComponent },
  { path: 'manage',  component: ManageComponent },
  { path: 'logout', redirectTo: '', pathMatch: 'full' },

  // { path: 'detail/:id', component: HeroDetailComponent },
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
