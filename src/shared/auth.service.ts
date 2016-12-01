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
import { GmailService } from '../shared/gmail.service';
import { FbService } from '../shared/fb.service';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('pA75v0B8UDfNOk0h2tDnz5in4Je3AZHL', 'rapport.auth0.com', {});
  constructor(private http: Http, 
              private router:Router,  
              private botService: BotService,
              private gmailService: GmailService,
              private fbService: FbService) {

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.router.navigate(['loading']);
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
    let userBots;
    //localStorage.setItem('id_token', authResult.idToken);
    this.signInUser(authResult)
      .then(userInfo => {
        console.log("user info", userInfo);
        localStorage.setItem('user_id',userInfo.id);
        userObj = userInfo;
        this.botService.getBots()
          .then(arrayOfResolves => userBots = arrayOfResolves[3])
          .then(() => this.gmailService.getContacts())
          .then(() => {
            if(userObj.fbCredentials){
              return this.fbService.getContacts(userObj.id);
            }  
          })
          .then(() => this.redirectForUserType(userObj, userBots))
          //show spinner
      });
  }

  public signInUser(authResult) {
     let body = JSON.stringify(authResult);
     let headers = new Headers({'Content-Type': 'application/json'});
           
      //update user info from backend
      return this.http.post('/signIn', body, {headers: headers})
        .map(res => res.json()).toPromise();
  }

  public redirectForUserType(userObj, userBots) {
    if(userObj.newUser || !userBots){
      this.router.navigate(['setup']);
    } else {
      this.router.navigate(['manage']);
    }
  }

  public authenticated() {
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}