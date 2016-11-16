import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Bot } from '../shared/bot';
import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {

  constructor(private http: Http) {

  }

  getBots(): Promise<Bot[]> {
    return Promise.resolve(BOTS);
  }

  getBot(id: number): Promise<Bot> {
    return this.getBots()
                .then(bots => bots.find(bot => bot.id === id));
  }
    
  xgetBots(){
    let token = localStorage.getItem('id_token');

    return this.http.get(`/api//bots?token=${token}`)
      .map((data: any) => data.json());
  }

  xupdateBots(botObject: any){
    let token = localStorage.getItem('id_token');
    let bodyString = JSON.stringify(botObject);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(`/api/bots?token=${token}`, bodyString, headers)
      .map((data: any) => data.json());
  }



}
