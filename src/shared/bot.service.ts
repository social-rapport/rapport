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
        self.userBots.push(...bots);
        return self.userBots; 
      }).toPromise();
  }

  addBotTypeToUser(bot: any){
    this.userBots.push(bot);
    console.log('selected user bots', this.userBots);
  }

  xupdateBots(botObject: any){
    let token = localStorage.getItem('id_token');
    let bodyString = JSON.stringify(botObject);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(`/api/bots?token=${token}`, bodyString, headers)
      .map((data: any) => data.json());
  }

   xgetBots(): Promise<Bot[]> {
    return Promise.resolve(BOTS);
  }

  
  // getBot(id: number): Promise<Bot> {
  //   return this.getBots()
  //               .then(bots => bots.find(bot => bot.id === id));
  // }

}
