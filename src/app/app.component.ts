import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  styleUrls: ['app/app/app.component.css'],
  template: `
    <h1>{{title}}</h1>
    <nav>
        <p>This is a change//</p>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  
})
export class AppComponent {
  title = 'Tour of Heroes';
}
