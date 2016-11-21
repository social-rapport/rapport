// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BotService } from './bot.service';
import { gmailContact } from '../shared/custom-type-classes';

//import { Auth0Lock } from 'auth0-lock'
// Avoid name not found warnings
//declare var Auth0Lock: any;

declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('pA75v0B8UDfNOk0h2tDnz5in4Je3AZHL', 'rapport.auth0.com', {});
  constructor(private http: Http, private router:Router,  private botService: BotService) {

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.onAuthentication(authResult);
    });
  }
  
  public login() {
    // Call the show method to display the widget./
    this.lock.show();
  };

  public onAuthentication(authResult) {
    console.log("on Auth called");
    let userObj;
    //localStorage.setItem('id_token', authResult.idToken);
    this.signInUser(authResult)
      .then(userInfo => {
        localStorage.setItem('user_id',userInfo.id);
        userObj = userInfo;
        this.botService.setInitialState()
          .then(() => this.redirectForUserType(userObj))
          .then(() => console.log("on authentication completed", this.botService));
      });
  }

  public signInUser(authResult) {
     let body = JSON.stringify(authResult);
     let headers = new Headers({'Content-Type': 'application/json'});
           
      //update user info from backend
      return this.http.post('/signIn', body, {headers: headers})
        .map(res => res.json()).toPromise();
  }

  public redirectForUserType(userObj) {
    userObj.newUser ? this.router.navigate(['setup']) : this.router.navigate(['home']);
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}