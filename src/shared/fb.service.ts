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

    public contacts: Array<any>;

    constructor(private http: Http){

    }

    public login(fbUsername: String, fbPassword: String){
        return this.saveCredentials(fbUsername, fbPassword)
        .then(()=>{
            var userId = localStorage.getItem('user_id');
            return this.getContacts(userId);
        });
    }

    public saveCredentials(fbUsername: String, fbPassword: String){
        let headers = new Headers({'Content-Type': 'application/json'});
        var body = {
            fbEmail: fbUsername,
            fbPassword: fbPassword,
        };

        return this.http.post('/updateFacebookCredentials', body, {headers: headers})
        .toPromise()
        .then((data)=>{
            console.log('save credentials resolved');
            //this.contacts = data.json(); 
        });
    }

    public getContacts(userId){
        return this.http.get(`/api/facebook/friends?userId=${userId}`)
            .toPromise()
            .then(data => {
                console.log('get contacts resolved');
                this.contacts = data.json();
            });
    }

};


