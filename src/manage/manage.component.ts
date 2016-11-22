import { Component } from '@angular/core';
import { customBot, gmailContact } from '../shared/custom-type-classes';
//change
import { BotService } from '../shared/bot.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GmailService} from '../shared/gmail.service';
import {FbService} from '../shared/fb.service';

import { ContactComponent } from '../contact/contact.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'manage-component',
  templateUrl: 'app/manage/manage.component.html',
  styleUrls: ['app/manage/manage.component.css']
})

export class ManageComponent {
  title = 'My Bots';

  private bots: Array<customBot>;
  private selectedBot: customBot;

  private activities: Array<string>;
  private contacts: Array<gmailContact>;
  private tasks: Array<string>;

  constructor(private botService: BotService, 
              private gmailService: GmailService) {}

  private onSelectBot(bot: any): void {
    this.selectedBot = bot;
    this.activities = bot.botActivity.recent;

    //these contacts are the contacts for the bot, not the users contacts
    if(this.selectedBot.botType === 'social'){
      this.contacts = bot.selectedFbFriends;
    } else {
      this.contacts = bot.selectedContacts;
    }
    this.tasks = bot.tasks;
  }

  private submitAllSettings(): void{
    this.botService.updateBots(this.bots);
  }

  private retireBot(bot): void {
    this.botService.retireBot(this.selectedBot).then(_=>{
      this.reload();
    })
  }

  private sendNow(): void {
    this.botService.sendNow()
      .then(console.log);
  }

  private reload() : void {
    this.bots = this.botService.getUserBots();
    this.onSelectBot(this.bots[0]);
  }

  private ngOnInit(): void {
    this.reload();
  }

}
