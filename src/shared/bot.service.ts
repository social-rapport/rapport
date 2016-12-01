import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { customBot, gmailContact } from '../shared/custom-type-classes';
//import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {

  public userBots;
  public botTypes;
  public holidays;
  public contacts: Array<gmailContact>;
  public tasks: Array<string>;
  public scheduled = null;
  public recent = null;
  public currentBot = null;
  public deletedTasks = [];
  public allTasks;

  constructor(private http: Http) {}

 //<----------------------BOT RETRIEVAL AND UPDATE---------------------->

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
          self.scheduled = self.joinScheduledTaskDescriptions(self.userBots);
          self.recent = self.joinRecentTaskDescriptions(self.userBots);

          return self.userBots;
        } else {
          self.userBots = [];
          self.scheduled = [];
        }
      }).toPromise()

  }

  //do rely on passed paramters 
  public updateBots(userBotsArray){
    this.normalizeDates();
    return this.deleteTasks()
    .then(this.postBots.bind(this));
  }

  public postBots(){
    var self = this;
    const userId = localStorage.getItem('user_id');
    const body = JSON.stringify({bots: this.userBots});
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(`/api/bots?userId=${userId}`, body, {headers: headers})
        .toPromise()
        .then(()=>{
          return self.importUserBots();
        })
        .catch((err)=>{
          console.log(err);
        })
  }

  public deleteTasks(){
    //userID must be factored out
    const userId = localStorage.getItem('user_id');
    const body = JSON.stringify({tasks: this.deletedTasks});
    //factor out headers
    const headers = new Headers({'Content-Type': 'application/json'});

    var r = this.http.post('/api/tasks', body, {headers: headers})
    .toPromise();
    this.deletedTasks = [];
    return r;
  }

  public retireBot(selectedBot){
    var self = this;
    const userId = localStorage.getItem('user_id');
    return this.http.delete(`/api/bots?botId=${selectedBot.id}`)
    .toPromise()
    .then(self.importUserBots.bind(self));
  }

   //<----------------------SETUP---------------------->

  public getBots(){
    //add get tasks when api endpoint is implemented
    return Promise.all([this.getHolidays(), this.getAllTasks(), this.getBotTypes(), this.importUserBots()]);
  }

  public getHolidays(){
    return this.http.get(`/api/holidays?year=${2016}`)
      .map((data: any) => {
        data = data.json();
        this.holidays = data;
        return data;
      }).toPromise();
  }

  public getAllTasks(){
      var self = this;
      return this.http.get('/api/tasks')
      .toPromise()
      .then(function(data){
        data = data.json();
        self.allTasks = data;
        self.extendTasks(self.allTasks);
      });
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

  public getTasks() {
    let userId = localStorage.getItem('user_id');

    this.http.get(`/api/tasks?userId=${userId}`)
      .map((data: any) => {
        data = data.json();
        //?
        this.contacts = data;
        return data;
      }).toPromise();
  }

   //<----------------------CONTACT REMOVAL---------------------->

  public removeSelectedContact(contact){
    const userId = localStorage.getItem('user_id');
    return this.http.delete(`/api/gmail/contacts?contactId=${contact.id}`).toPromise()
    .then(_=>{
      return this.importUserBots();
    });
  }

  public removeSelectedFbContact(contact){
    const userId = localStorage.getItem('user_id');
    return this.http.delete(`/api/facebook/friends?contactId=${contact.id}`).toPromise()
    .then(_=>{
      return this.importUserBots();
    });
  }

   //<----------------------TASK ADDITION---------------------->

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


  //<----------------------DATA TRANSFORMATIONS FROM BACKEND TO FRONTEND---------------------->



  public botExtensions = {
    'basic': {
      deletedTasks: [], 
      potentialTasks: [],
      platform: 'gmail',
    },
    'social': {
      deletedTasks: [], 
      potentialTasks: [],
      platform: 'facebook',
    },
    'power': {
      deletedTasks: [], 
      potentialTasks: [],
      platform: 'facebook',
    }
  }

  public decorateAll(bots){
    var self = this;
    bots.forEach(function(bot){
      bot.decorated = JSON.parse(JSON.stringify(self.botExtensions[bot.botType]));
      self.addPotentialTasks(bot);
      self.extendTasks(bot.tasks);
    });
  }

  private extendTasks(tasks){
    var self = this;
    tasks.forEach(function(task){
      task.decorated = Object.assign({},self.taskExtensions[task.task]);
      self.markSubTask(task);
    });
  }

  private markSubTask(task){
    var self = this;
    if(task.date === null){
      task.decorated.subTask = false;
    }
    if(task.date !== null && task.decorated.subTask){
      task.decorated.masterTask = false;
      task.decorated.formattedName = self.holidays.filter((h)=>{
        return h.date === task.date
      })[0].name;
    }
  }

  public taskExtensions = {
    'sayHiGmail':           {formattedName: 'message on gmail',
                            setsDate: true, 
                            setsInterval: true,}, 
    'sayHappyBirthdayGmail':{formattedName: 'birthday wishes on gmail',
                            setsDate: false, 
                            setsInterval: false,},
    'sayHappyHolidayGmail': {formattedName: 'holiday on gmail', 
                            setsDate: false, 
                            setsInterval: false, 
                            masterTask: true,
                            holidays: true}, 
    'sayHiFacebook':        {formattedName: 'message on facebook',
                            setsDate: true, 
                            setsInterval: true,},
    'sayHappyBirthdayFacebook':{formattedName: 'birthday wishes on facebook',
                            setsDate: false, 
                            setsInterval: false,}, 
    'sayHappyHolidayFacebook': {formattedName: 'holiday on facebook', 
                            setsDate: false, 
                            setsInterval: false, 
                            subTask: true,
                            holidays: true}, 
  };

  public addPotentialTasks(bot){
    this.allTasks.forEach(function(_potentialTask){
      var potentialTask = JSON.parse(JSON.stringify(_potentialTask));
      var match = bot.tasks.some(function(botTask){
        return botTask.task === potentialTask.task;
      });
      if(!match && (bot.decorated.platform === potentialTask.platform)){
        bot.decorated.potentialTasks.push(potentialTask);
      }
    })
  }

  public joinScheduledTaskDescriptions(bots){
    var tasks = bots.reduce(function(acc,bot){
      return acc.concat(bot.botActivity.scheduled);
    },[]);
    return tasks;
  }

  public joinRecentTaskDescriptions(bots){
    var recent = bots.reduce(function(acc,bot){
      return acc.concat(bot.botActivity.recent)
    },[]);
    return recent;
  }


  //<----------------------DATA TRANSFORMATIONS FROM FRONTEND TO BACKEND---------------------->
  public normalizeDates(){
    this.userBots.forEach(function(bot){
      bot.selectedContacts.forEach(function(contact){
        if(contact.birthday){
          var date = new Date(contact.birthday);
          var month = date.getMonth();
          var day = date.getDay();
          contact.birthday = String(month) + '/' + String(day);
        }
      })
      bot.tasks.forEach(function(task){
        if(task.date && task.date !== 'today'){
          var date = new Date(task.date);
          var month = date.getMonth();
          var day = date.getDay();
          task.date = String(month) + '/' + String(day);
        }
      })
    })
  }

  //<-----------------GETTERS AND SETTERS----------------->

  public getDisplayName(bot){
    if(bot.botName !== 'MyBot'){
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

