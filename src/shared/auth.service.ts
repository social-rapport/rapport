// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
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

  constructor(private http: Http) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      let body = JSON.stringify(authResult);
      let headers = new Headers({'Content-Type': 'application/json'});
      console.log("body", body);

      localStorage.setItem('id_token', authResult.idToken);
      this.http.post('/signIn', body, {headers: headers})
        .map(res => res.json())
        .subscribe(data => console.log("returned data",data));
    });
  }

  public login() {
    // Call the show method to display the widget.
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