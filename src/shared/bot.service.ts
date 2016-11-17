import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Bot } from '../shared/bot';
import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {
  
  botTypes;
  userBots; 

  constructor(private http: Http) {
    this.botTypes = null;
    this.userBots = [];
  }

  getBotTypes(){
    let token = localStorage.getItem('id_token');
    let email = localStorage.getItem('user_email');

    return this.http.get(`/api/botTypes`)
      .map(function(data: any) {
          return JSON.parse(data._body).bots;
      }).toPromise();
  }

  importUserBots(){
    let token = localStorage.getItem('id_token');
    let email = localStorage.getItem('user_email');
    var self = this;

    return this.http.get(`/api/bots?email=${email}`) 
      .map(function(data: any) {
        var bots = JSON.parse(data._body);
        console.log("bots returned", bots);
        if(bots) {
          self.userBots = bots.bots;
          return self.userBots; 
        }
      }).toPromise();
  }

  getUserBots(){
    return this.userBots || [];
  }

  addBotTypeToUser(bot: any){
    this.userBots.push(bot);
    console.log('selected user bots', this.userBots);
  }

  updateBots(userBotsArray){
   let email = localStorage.getItem('user_email');
   const body = JSON.stringify(userBotsArray);
   const headers = new Headers({'Content-Type': 'application/json'})

   console.log("userbots array stringified", body);

   this.http.put(`/api/bots?email=${email}`, body, {headers: headers})
      .map((data: any) => data.json())
      .subscribe(
        response => console.log("response", response),
        error => console.log("error", error),
        () => console.log("bot update completed")
      )
  }

}

  
  // getBot(id: number): Promise<Bot> {
  //   return this.getBots()
  //               .then(bots => bots.find(bot => bot.id === id));
  // }

