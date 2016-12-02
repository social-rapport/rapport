import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { customBot, gmailContact } from '../shared/custom-type-classes';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class _BotService {
  
  //state is single observable
  public state = new Subject();
  state$ = this.state.asObservable();
  private _state; 
  private userId;

  constructor(private http: Http){
    this._state.botTypes;
    this._state.userBots; 
  }

  public getBots(){
    this.userId = localStorage.getItem('user_id');
    return Promise.all([this.getBotTypes(), this.importUserBots()]);
  }

  public getBotTypes(){
    let token = localStorage.getItem('id_token');
    let id = localStorage.getItem('user_id');

    return this.http.get(`/api/botTypes`)
      .map(function(data: any) {
          this._state.botTypes = JSON.parse(data._body).bots;
          this.state$.next(this._state);
      });
  }

  public importUserBots(){
    var self = this;

    return this.http.get(`/api/bots?userId=${this.userId}`) 
      .map(function(data: any) {
        var bots = JSON.parse(data._body);
        if(bots.length !== 0) {
          this._state.userBots = bots;          
        } else {
          this._state.userBots = [];
        }
        this.update();
      });
  }

  public getTasks() {
    this.http.get(`/api/tasks?userId=${this.userId}`)
      .map((data: any) => {
        data = data.json();
        this._state.contacts = data;
        this.update();
      });
  }

   public updateBots(){
   const headers = new Headers({'Content-Type': 'application/json'});
   const body = JSON.stringify({bots: this._state.userBots});

   return this.http.put(`/api/bots?userId=${this.userId}`, body, {headers: headers})
      .toPromise()
      .then(()=>{
        this.importUserBots();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  public removeSelectedContact(contact){
    return this.http.delete(`/api/gmail/contacts?contactId=${contact.id}`).toPromise()
    .then(_=>{
      this.importUserBots();
    });
  }

  trigger(){
    this.update();
  }

  update(){
    this.state.next(this._state);
  }

  //<-----------------ACTIONS FOR USE WITH STORE----------------->

  public actions(name,payload){
    //deep copy state here
    //loses reference to the object you are trying to change?
    switch(name){
      case 'DELETE-TASK': 
        payload.bot.tasks = payload.bot.tasks.filter(function(task){
          return task !== payload.task;
        });
        //assign copied state to next observable
        this.trigger();
        break;
      default: 
        alert('unhandled action');
    }

  }

}

