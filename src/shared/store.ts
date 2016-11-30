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

}