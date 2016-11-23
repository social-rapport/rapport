import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { Auth } from '../shared/auth.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
//import { ModalComponent } from 'ng2-bs3-modal/src/ng2-bs3-modal/ng2-bs3-modal';
//import { ModalResult } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app/app.component.css'],
  providers: [Auth],
  template: `
    <nav>
        <a *ngIf="authenticated()" routerLink="/setup" routerLinkActive="active">Choose A Bot</a>
        <a *ngIf="authenticated()" routerLink="/manage" routerLinkActive="active">Dashboard</a>
        <a (click)="test()">Test</a>
        <a *ngIf="authenticated()" routerLink="/logout" routerLinkActive="active" class="right">Logout</a>
        <a class='login' *ngIf="!authenticated()" class="right" (click)="login()">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,

})


export class AppComponent {

  constructor(private auth: Auth,
              private router: Router,
              ) {

    this.router.events.subscribe(path => {
      console.log('path = ', path);
      if(path.url === '/logout'){
        this.auth.logout();
        this.authAction = 'Login';
      }

      if(path.url === '/home') {

      }
    });
  }

  authenticated(){
    return this.auth.authenticated();
  }

  login(){
    this.auth.login();
  }

  test(){
    this.router.navigate(['loading']);
  }


  authAction = "Login";
  title = 'Rapport';

  // authAct(){
  //   if(!this.auth.authenticated()){
  //     this.auth.login();
  //   } else {
  //     this.auth.logout();
  //     this.router.navigate(['']);
  //   }
  // }
}
