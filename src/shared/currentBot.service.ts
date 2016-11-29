import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { customBot, gmailContact } from '../shared/custom-type-classes';
import { GmailService} from '../shared/gmail.service';
import { FbService} from '../shared/fb.service';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class CurrentBotService {
  
  public state = new Subject();
  state$ = this.state.asObservable();

  private _state; 

  constructor(private gmailService: GmailService,
              private fbService: FbService){

  }
  
  setBot(bot){
    this._state.bot = bot; 
    this.update();
  }

  addContact(selectedContact){
    this._state.selectedContacts.push(selectedContact);
    this.update();
  }

  removeContact(selectedContact){
    var i = this._state.selectedContacts.indexOf(selectedContact);
    this._state.selectedContacts.slice(i,1);
    this.update();
  }

  update(){
    this.state.next(this._state);
  }

}

