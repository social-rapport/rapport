import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Auth }           from '../shared/auth.service';
import { Component } from '@angular/core';

// @Component({
//     providers: [Auth],
// })
@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private auth: Auth){

    }

    canActivate() {
        console.log('AuthGuard#canActivate called');
        var a = this.auth.authenticated();
        return a; 
    }
}