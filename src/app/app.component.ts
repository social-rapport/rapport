import { Component } from '@angular/core';
import { Auth } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app/app.component.css'],
  providers: [Auth],
  template: `
    <h1>{{title}}</h1>
    <nav>
        <a routerLink="/home" routerLinkActive="active">home</a>
        <a *ngIf="authenticated()" routerLink="/setup" routerLinkActive="active">Choose A Bot</a>
        <a *ngIf="authenticated()" routerLink="/manage" routerLinkActive="active">Manage Bots</a>
        <a *ngIf="authenticated()" routerLink="/logout" routerLinkActive="active" class="right">Logout</a>
        <a *ngIf="!authenticated()" class="right" (click)="login()">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  
})
export class AppComponent {
  constructor(private auth: Auth,private router: Router) {
  
    this.router.events.subscribe(path => {
      console.log('path = ', path);
      if(path.url === '/logout'){
        this.auth.logout();
        this.authAction = 'Login';
      }
    });
  }

  authenticated(){
    return this.auth.authenticated();
  }

  login(){
    this.auth.login();
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
