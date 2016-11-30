import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { customBot, gmailContact } from '../shared/custom-type-classes';

@Injectable()
export class GmailService {

    public contacts: Array<gmailContact>;

    constructor(private http: Http) {}

    public getContacts() {
        let userId = localStorage.getItem('user_id');

        return this.http.get(`/api/gmail/contacts?userId=${userId}`)
        .map((data: any) => {
            this.contacts = data.json();
            return this.contacts;
        }).toPromise();
    }

}