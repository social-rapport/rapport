import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Injectable }      from '@angular/core';
import { GmailService } from '../shared/gmail.service';
import { BotService } from '../shared/bot.service';

@Injectable()
export class Store {
    private userBots = new BehaviorSubject([]);
    public userBots$ = this.userBots.asObservable();

    private selectedBot = new BehaviorSubject({});
    public selectedBot$ = this.selectedBot.asObservable();

    private availableContacts = new BehaviorSubject([{name: 'x'}]);
    public availableContacts$ = this.availableContacts.asObservable();

    private selectedContacts = new BehaviorSubject([]);
    public selectedContacts$ = this.selectedContacts.asObservable();

    private _gmailContacts;
    private _fbContacts;
    private _botTypes; 

    constructor(private gmailService: GmailService, private botService: BotService) {

          gmailService.getContacts().then(contacts=>{
            this._gmailContacts = contacts;
          })
        
    }

    public addBot(bot){
      var p = this.userBots.getValue();
      this.userBots.next(p.concat(bot));
      console.log('state',this.userBots.getValue());
    }

    public selectBot(bot){
      this.selectedBot.next(bot);
      if(bot.botType = 'basic'){
        this.selectedContacts.next(bot.selectedGmailContacts);
        var p = this.availableContacts.getValue();
        p = p.concat([{name: 'a'}]);
        this.availableContacts.next(p);
      }
      if(bot.botType = 'social'){
        this.selectedContacts.next([{name: 'a'}]);
        this.availableContacts.next(this._fbContacts);
      }
    }

}