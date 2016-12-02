import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { Auth } from '../shared/auth.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
//import { ModalComponent } from 'ng2-bs3-modal/src/ng2-bs3-modal/ng2-bs3-modal';
//import { ModalResult } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BotService } from '../shared/bot.service';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app/app.component.css'],
  providers: [Auth],
  template: `
    <nav>
        <a *ngIf="authenticated()" routerLink="/setup" routerLinkActive="active">Add A Bot</a>
        <a *ngIf="authenticated() && hasBot()" routerLink="/manage" routerLinkActive="active">Manage Bots</a>
        <a *ngIf="authenticated()" routerLink="/view-activities" routerLinkActive="active">View Activities</a>
        <a *ngIf="authenticated()" routerLink="/logout" routerLinkActive="active" class="right">Logout</a>
        <a class='login' *ngIf="!authenticated()" class="right" (click)="login()">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,

})


export class AppComponent {

  constructor(private auth: Auth,
              private router: Router,
              private botService: BotService,
              ) {

    this.router.events.subscribe(path => {
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

  hasBot(){
    return this.botService.userBots && this.botService.userBots.length > 0;
  }


  authAction = "Login";
  title = 'Rapport';

}
