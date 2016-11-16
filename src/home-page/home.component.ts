import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/auth.service';
import {GmailLoginComponent} from '../gmail-login/gmail-login.component';

@Component({
  selector: 'home',
  //providers: [Auth,GmailLoginComponent],
  styleUrls: ['app/home-page/home.component.css'],
  template: `<nav>
              <ul> 
                <li><a href="#">bots</a></li>
                <li><a href="#">activity</a></li>
                <li><a href="#">account</a></li>
              </ul>
             </nav>`
})
export class HomePageComponent {
  constructor(private router: Router, private auth: Auth
  ) {}

  ngOnInit(): void {
    
  }

}