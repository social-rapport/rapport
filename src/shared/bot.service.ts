import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { customBot, gmailContact } from '../shared/custom-type-classes';
//import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {
  
  //bots: Array<customBot>;
  public userBots: Array<customBot>;
  public botTypes: Array<customBot>;
  public holidays;
  public contacts: Array<gmailContact>;
  public tasks: Array<string>;

  public currentBot = null;
   
  constructor(private http: Http) {}

  public getBots(){
    //add get tasks when api endpoint is implemented
    return Promise.all([this.getBotTypes(), this.importUserBots()]);
  }

  public getBotTypes(){
    let token = localStorage.getItem('id_token');
    let id = localStorage.getItem('user_id');

    return this.http.get(`/api/botTypes`)
      .map(function(data: any) {
          this.botTypes = JSON.parse(data._body).bots;
          return this.botTypes;
      }).toPromise();
  }

  public importUserBots(){
    let token = localStorage.getItem('id_token');
    let userId = localStorage.getItem('user_id');
    var self = this;

    return this.http.get(`/api/bots?userId=${userId}`) 
      .map(function(data: any) {
        var bots = JSON.parse(data._body);
        if(bots.length !== 0) {
          self.userBots = bots;
          return self.userBots; 
        } else {
          self.userBots = [];
        }
      }).toPromise();
  }

  public getHolidays(){
    return this.http.get(`/api/holidays?year=${2016}`)
      .map((data: any) => {
        data = data.json();
        this.holidays = data;
        return data;
      }).toPromise();
  }

  public getTasks() {
    let userId = localStorage.getItem('user_id');

    this.http.get(`/api/tasks?userId=${userId}`)
      .map((data: any) => {
        data = data.json();
        this.contacts = data;
        return data;
      }).toPromise();
  }

  public retireBot(selectedBot){
    const userId = localStorage.getItem('user_id');
    return this.http.delete(`/api/bots?botId=${selectedBot.id}`)
    .toPromise()
    .then(()=>{
      console.log('bot deleted');
      this.userBots = this.userBots.filter((bot)=>{
        return bot.id !== selectedBot.id;
      })
    })
  }

  public updateBots(userBotsArray){
   console.log("user bots to be saved", userBotsArray);
   const userId = localStorage.getItem('user_id');
   const body = JSON.stringify({bots: userBotsArray});
   const headers = new Headers({'Content-Type': 'application/json'});

   return this.http.put(`/api/bots?userId=${userId}`, body, {headers: headers})
      .toPromise()
      .then(()=>{
        return this.importUserBots();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  public removeSelectedContact(contact){
    const userId = localStorage.getItem('user_id');
    return this.http.delete(`/api/gmail/contacts?contactId=${contact.id}`).toPromise()
    .then(_=>{
      return this.importUserBots();
    });
  }

  public removeSelectedFbContact(contact){
    const userId = localStorage.getItem('user_id');
    
    console.log("contact id", contact.id);
    console.log("contact", contact);

    return this.http.delete(`/api/facebook/friends?contactId=${contact.id}`).toPromise()
    .then(_=>{
      return this.importUserBots();
    });
  }

  //<-----------------GETTERS AND SETTERS----------------->

  public getDisplayName(bot){
    if(bot.botName !== 'unnamed'){
      return bot.botName;
    } else {
      return bot.botType;
    }
  }
  
  public sendNow(){
    return this.http.get('/api/runalltasks').toPromise();
  }

  public getUserBots(){
    return this.userBots || [];
  }

  public returnContacts(){
    return this.contacts || [];
  }

  public addBotTypeToUser(bot: any){
    this.userBots.push(bot);
  }

}

