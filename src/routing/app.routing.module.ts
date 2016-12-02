import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent}   from '../landing-page/landing-page.component';
import {SetupComponent}   from '../setup/setup.component';
import {ManageComponent}   from '../manage/manage.component';
import {Auth0CallbackGuard} from '../shared/auth0.guard';
import {AuthGuard} from '../shared/auth.guard';
import { HomePageComponent } from '../home-page/home.component';
import { SearchComponent } from '../search/search.component';
import { LoadingComponent } from '../loading/loading.component';
import { LogInGuard } from '../shared/logged-in.guard';
import { ActivitiesContainer } from '../view-activities/view-activities.component';

//canActivate:[LogInGuard],

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'loading', component: LoadingComponent},
  { path: 'view-activities', component: ActivitiesContainer},
  { path: 'search', component: SearchComponent },
  { path: 'setup', canActivate:[AuthGuard], component: SetupComponent,},
  { path: 'manage', canActivate: [AuthGuard], component: ManageComponent },
  { path: 'logout', redirectTo: '', pathMatch: 'full' },
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard,
  ],
})
export class AppRoutingModule {}
