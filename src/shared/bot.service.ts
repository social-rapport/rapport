import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { customBot, gmailContact } from '../shared/custom-type-classes';
import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {
  
  //bots: Array<customBot>;
  public userBots: Array<customBot>;
  public botTypes: Array<customBot>;

  public contacts: Array<gmailContact>;
  public tasks: Array<string>;
   

  constructor(private http: Http) {}

  public setInitialState(){
    return this.getBotTypes()
      .then(() => this.getContacts())
        //.then(() => this.getTasks())
      .then(() =>this.importUserBots())
  }

  public getBotTypes(){
    let token = localStorage.getItem('id_token');
    let email = localStorage.getItem('user_email');

    return this.http.get(`/api/botTypes`)
      .map(function(data: any) {
          this.botTypes = JSON.parse(data._body).bots;
          console.log("bot types", this.botTypes);
          return this.botTypes;
      }).toPromise();
  }

  public getContacts() {
    let token = localStorage.getItem('id_token');

    return this.http.get(`/api/gmail/contacts?token=${token}`)
      .map((data: any) => {
        this.contacts = data.json();
        return this.contacts;
      }).toPromise();
  }

  public getTasks() {
    let token = localStorage.getItem('id_token');

    this.http.get(`/api/tasks?token=${token}`)
      .map((data: any) => {
        data = data.json();
        this.contacts = data;
        return data;
      }).toPromise();
  }

  public importUserBots(){
    let token = localStorage.getItem('id_token');
    let email = localStorage.getItem('user_email');
    var self = this;

    return this.http.get(`/api/bots?email=${email}`) 
      .map(function(data: any) {
        var bots = JSON.parse(data._body);
        if(bots.length !== 0) {
          self.userBots = bots.bots;
          return self.userBots; 
        }
      }).toPromise();
  }

  public getUserBots(){
    return this.userBots || [];
  }

  public addBotTypeToUser(bot: any){
    this.userBots.push(bot);
  }

  public updateBots(userBotsArray){
   const email = localStorage.getItem('user_email');
   const body = JSON.stringify({bots: userBotsArray});
   const headers = new Headers({'Content-Type': 'application/json'});

   this.http.put(`/api/bots?email=${email}`, body, {headers: headers})
      .subscribe(
        response => console.log("response", response),
        error => console.log("error", error),
        () => {
          //TODO: remove this run tasks when cron is working
          this.http.get('/api/runalltasks')
            .map(resp => resp.json())
            .subscribe(
              response => console.log("response", response),
              error => console.log("error", error),
              () => console.log("finished")
            );
        }
      )
  }

}

