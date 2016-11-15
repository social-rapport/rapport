// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Auth0Lock } from 'auth0-lock'
// Avoid name not found warnings
//declare var Auth0Lock: any;


declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('pA75v0B8UDfNOk0h2tDnz5in4Je3AZHL', 'rapport.auth0.com', {});

  constructor(private http: Http, private router:Router) {
    // Add callback for lock `authenticated` event
    var self = this;
    this.lock.on("authenticated", (authResult) => {
      let body = JSON.stringify(authResult);
      let headers = new Headers({'Content-Type': 'application/json'});
      console.log("body", body);

      localStorage.setItem('id_token', authResult.idToken);
      this.http.post('/signIn', body, {headers: headers})
        .map(res => res.json())
        .subscribe(data => console.log("returned data",data));
    });

    // this.router.events.take(1).subscribe(event => {
    //   if (/access_token/.test(event.url) || /error/.test(event.url)) {  

    //     let authResult = this.auth0.parseHash(window.location.hash);

    //     if (authResult && authResult.idToken) {
    //       this.lock.emit('authenticated', authResult);
    //     }

    //     if (authResult && authResult.error) {
    //       this.lock.emit('authorization_error', authResult);
    //     }
    //   }
    // });
  }

  public login() {
    // Call the show method to display the widget./
    this.lock.show();
  };

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