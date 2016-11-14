import { Component } from '@angular/core';
import { Auth } from '../shared/auth.service';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app/app.component.css'],
  providers: [Auth],
  template: `
    <h1>{{title}}</h1>
    <nav>
                <p>This is a change//</p>
        <a routerLink="/welcome" routerLinkActive="active">Landing Page</a>
        <a routerLink="/dashboard" routerLinkActive="active">Choose A Bot</a>
        <a routerLink="/heroes" routerLinkActive="active">Bot Management</a>
      
    </nav>
    <router-outlet></router-outlet>
  `,
  
})
export class AppComponent {
  constructor(private auth: Auth) {}

  title = 'Tour of Heroes';
}
