import { Component, ViewChild } from '@angular/core';
import { customBot, gmailContact } from '../shared/custom-type-classes';
//change
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GmailService} from '../shared/gmail.service';
import {FbService} from '../shared/fb.service';

import { ContactComponent } from '../contact/contact.component';
import { SearchComponent } from '../search/search.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {CurrentBotService} from '../shared/currentBot.service';
import {_BotService} from '../shared/_bot.service';

@Component({
  selector: '_manage-component',
  templateUrl: 'app/manage/_manage.component.html',
  styleUrls: ['app/manage/manage.component.css']
})

export class _ManageComponent {

  private userBots; 

  constructor(private botService: _BotService,
              private currentBotService: CurrentBotService){

    // botService.getBots();

    // this.botService.state$.subscribe(
    //   state => {
    //     console.log(state);
    //   });

    // this.currentBotService.state$.subscribe(
    //   state => {
    //     console.log(state);
    //   });
  }
 
}
