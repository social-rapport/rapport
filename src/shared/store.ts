import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Injectable }      from '@angular/core';
import { GmailService } from '../shared/gmail.service';
import { BotService } from '../shared/bot.service';

@Injectable()
export class Store {


    public state = new BehaviorSubject({});
    state$ = this.state.asObservable();
    private _state; 
    private userId;

    constructor(private gmailService: GmailService, private botService: BotService) {

          gmailService.getContacts().then(contacts=>{

          })
        
    }

    public addBot(bot){
      
    }

    public trigger(){
      this.state.next({});
    }

    public selectBot(bot){

      if(bot.botType = 'basic'){
        // this.selectedContacts.next(bot.selectedGmailContacts);
        // var p = this.availableContacts.getValue();
        // p = p.concat([{name: 'a'}]);
        // this.availableContacts.next(p);
      }
      if(bot.botType = 'social'){
        // this.selectedContacts.next([{name: 'a'}]);
        // this.availableContacts.next(this._fbContacts);
      }
    }

  public actions(name,payload){
    //deep copy state here
    //loses reference to the object you are trying to change?
    switch(name){
      case 'DELETE-TASK': 
        payload.bot.tasks = payload.bot.tasks.filter(function(task){
          return task !== payload.task;
        });
        this.botService.deletedTasks.push(payload.task.id);
        //assign copied state to next observable
        this.trigger();
        break;
      case 'ADD-TASK': 
        payload.bot.tasks.push(payload.task);
        payload.bot.decorated.potentialTasks = payload.bot.decorated.potentialTasks.filter(function(task){
          return task !== payload.task;
        });
        this.trigger();
        break;
      default: 
        alert('unhandled action');
    }

  }

}