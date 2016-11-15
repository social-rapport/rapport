import { Injectable }      from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Contact {

  constructor(private http: Http, private router:Router) {
    
  }

  public getContacts() {
    let token = localStorage.getItem('id_token');

    return this.http.get(`/api/gmail/contacts?token=${token}`)
      .map((data: any) => data.json());
  } 
}