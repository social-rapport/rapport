import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/auth.service';
import {GmailLoginComponent} from '../gmail-login/gmail-login.component';

@Component({
  selector: 'my-heroes',
  //providers: [Auth,GmailLoginComponent],
  template: `<p>Welcome </p>
            `,
})

export class LandingPageComponent {
  constructor(private router: Router, private auth: Auth
  ) {}

  ngOnInit(): void {
    
  }

}
