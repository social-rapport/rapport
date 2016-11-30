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
  public taskExtensions = {
    'sayHappyHolidayGmail': {formattedName: 'holiday: gmail', 
                            setsDate: false, 
                            setsInterval: false, 
                            subTask: true,
                            holidays: true},
    'sayHappyBirthdayGmail':{formattedName: 'birthday: gmail',
                            setsDate: true, 
                            setsInterval: true,}, 
    'sayHappyBirthdayFacebook':{formattedName: 'birthday: facebook',
                            setsDate: true, 
                            setsInterval: true,}, 
    'sayHiGmail':           {formattedName: 'message: gmail',
                            setsDate: true, 
                            setsInterval: true,}, 
    'sayHiFacebook':        {formattedName: 'message: facebook',
                            setsDate: true, 
                            setsInterval: true,},
  };
  
  public scheduled = null;
  public recent = null;
  public currentBot = null;
   
  constructor(private http: Http) {}

  public getBots(){
    //add get tasks when api endpoint is implemented
    return Promise.all([this.getHolidays(), this.getBotTypes(), this.importUserBots()]);
  }

  public getBotTypes(){
    let token = localStorage.getItem('id_token');
    let id = localStorage.getItem('user_id');
    var self = this;
    return this.http.get(`/api/botTypes`)
      .map(function(data: any) {
          self.botTypes = JSON.parse(data._body).bots;
          self.decorateAll(self.botTypes);
          return self.botTypes;
      }).toPromise();
  }

  public joinTaskDescriptions(bots){
    var jobs = bots.reduce(function(acc,bot){
      return acc.concat(bot.botActivity.scheduled);
    },[]);
    var recent = bots.reduce(function(acc,bot){
      return acc.concat(bot.botActivity.recent)
    },[])
    return jobs.concat(recent);
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
          self.decorateAll(self.userBots);
          self.scheduled = self.joinTaskDescriptions(self.userBots);
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

  public decorateAll(bots){
    var self = this;
    bots.forEach(function(bot){
      bot.tasks.forEach(function(task){
        task.decorated = Object.assign({},self.taskExtensions[task.task]);
        if(task.date === null){
          task.decorated.subTask = false;
        }
        if(task.decorated.subTask){
          task.decorated.formattedName = self.holidays.filter((h)=>{
            return h.date === task.date
          })[0].name;
        }
      });
    });
  }

  public addNewHolidayTask(taskOptions,bot){
    var date = this.holidays.filter(function(holiday){
      return holiday.name === taskOptions.name; 
    })[0].date;
    
    var task = {id: null,
                id_bot: null,
                interval: 12,
                date: date,
                message: taskOptions.message,
                task: 'sayHappyHolidayGmail',
                platform: 'gmail',
                decorated: {
                            formattedName: taskOptions.name,
                            setsInterval: false,
                            setsDate: false,
                            subTask: true}
                };

    bot.tasks.push(task);
  }

//   date:"today"
// id:1
// id_bot:1
// id_task:1
// interval:6
// message:"Howdy! how are ya!"
// platform:"gmail"
// task:"sayHiGmail"

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

