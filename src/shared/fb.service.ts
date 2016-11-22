import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FbService {

    public contacts;

    constructor(private http: Http){

    }

    public saveCredentials(fbUsername: String, fbPassword: String){
        let headers = new Headers({'Content-Type': 'application/json'});
        var body = {
            fbEmail: fbUsername,
            fbPassword: fbPassword,
        };
        console.log('sending body:', body);
        return this.http.post('/updateFacebookCredentials', body, {headers: headers})
        .toPromise()
        .then((data)=>{
            this.contacts = data.json(); 
        });
    }

    public getContacts(userId){
        return this.http.get('/api/facebook/friends')
            .toPromise()
            .then(data => this.contacts = data);
    }

};


