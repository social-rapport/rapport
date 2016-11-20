import { Component } from '@angular/core';
import { customBot, gmailContact } from '../shared/custom-type-classes';
//change
import { BotService } from '../shared/bot.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private botService: BotService) {}

  private onSelectBot(bot: any): void {
    this.selectedBot = bot;
    console.log("selected bot", this.selectedBot);
    this.activities = bot.botActivity.recent;
    this.contacts = bot.selectedContacts;
    this.tasks = bot.tasks;
  }

  private submitAllSettings(): void{
    this.botService.updateBots(this.bots);
  }

  private ngOnInit(): void {
    this.bots = this.botService.getUserBots();
    console.log("bots", this.bots);
    this.onSelectBot(this.bots[0]);
  }
}
