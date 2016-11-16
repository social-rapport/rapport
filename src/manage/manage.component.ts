import { Component } from '@angular/core';
import { Bot } from '../shared/bot';

import { BotService } from '../shared/bot.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'manage-component',
  //providers: [BotService],
  templateUrl: 'app/manage/manage.component.html',
  styleUrls: ['app/manage/manage.component.css']
})

export class ManageComponent {
  constructor(private botService: BotService) {
    this.callback = this.callback.bind(this);
  }

  title = 'My Bots';

  bots: any;
  selectedBot: Bot;

  activities: string [];
  selectedActivity: string;

  contacts: Object[];
  selectedContact: string;

  tasks: string [];
  selectedTask: string;

  getBots(): void {
    this.botService.importUserBots().then(bots => {
      this.bots = bots
      this.onSelectBot(this.bots[0]);
      console.log("bots array", this.bots);
      console.log("selected bot", this.selectedBot);
    });
  }

  onSelectBot(bot: Bot): void {
    this.selectedBot = bot;
    this.activities = this.selectedBot.activities;
    this.contacts = this.selectedBot.contacts;
    this.tasks = this.selectedBot.tasks;
  }

  onSelectActivity(activity): void {
    this.selectedActivity = activity;
  }

  callback(): void{
    console.log('contact activated');
  }

  onSelectContact(contact): void {
    this.selectedContact = contact;
  }

  onSelectTask(task): void {
    this.selectedTask = task;
  }

  submitAllSettings(): void{
    //this.botService.submit(this.bots);
  }

  ngOnInit(): void {
    this.getBots();
  }
}
