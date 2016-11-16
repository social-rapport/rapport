import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class Auth0CallbackGuard implements CanActivate {

  constructor(private location: Location) { }

  //ensures that the route is not sanitized by hashlocationstrategy when Auth0 requires
  //the embedded tokeninformation to authenticate
  canActivate() {
    return this.location.path(true).indexOf("access_token") === -1;
  }
}