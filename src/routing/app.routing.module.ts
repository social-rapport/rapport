import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { HeroesComponent }      from '../heroes/heroes.component';
import { HeroDetailComponent }  from '../detail/hero-detail.component';
import {LandingPageComponent}   from '../landing-page/landing-page.component';

const routes: Routes = [
  // { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '', component: LandingPageComponent},
  // { path: 'dashboard',  component: HeroesComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'setup',     component: DashboardComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
