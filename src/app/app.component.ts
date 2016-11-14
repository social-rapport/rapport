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
        <a routerLink="/setup" routerLinkActive="active">Choose A Bot</a>
        <a routerLink="/manage" routerLinkActive="active">Manage Bots</a>
        <button class="right" (click)="logout()">Logout</button>

    </nav>
    <router-outlet></router-outlet>
  `,
  
})
export class AppComponent {
  constructor(private auth: Auth,private router: Router) {}

  title = 'Tour of Heroes';

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }
}
