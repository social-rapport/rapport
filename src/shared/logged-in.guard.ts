import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../shared/auth.service';
import { Component } from '@angular/core';

@Injectable()

export class LogInGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router){

  }

  canActivate() {
    if(this.auth.authenticated()) {
      this.router.navigate(['loading']);
      this.auth.onAuthentication({idToken: localStorage.getItem('id_token')});
      return false;
    } else {
      return true;
    }
  }
}