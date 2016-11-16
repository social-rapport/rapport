import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Bot } from '../shared/bot';
import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {

  constructor(private http: Http) {

  }

  xgetBots(): Promise<Bot[]> {
    return Promise.resolve(BOTS);
  }

  // getBot(id: number): Promise<Bot> {
  //   return this.getBots()
  //               .then(bots => bots.find(bot => bot.id === id));
  // }
    
  getBots(){
    let token = localStorage.getItem('id_token');
    let email = localStorage.getItem('user_email');

    return this.http.get(`/api/bots?email=${email}`)
      .map(function(data: any) {
        console.log(data);
      }).toPromise();
  }

  xupdateBots(botObject: any){
    let token = localStorage.getItem('id_token');
    let bodyString = JSON.stringify(botObject);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(`/api/bots?token=${token}`, bodyString, headers)
      .map((data: any) => data.json());
  }



}
