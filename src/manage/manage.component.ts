import { Component } from '@angular/core';
import { Bot } from '../shared/bot';

import { BotService } from '../shared/bot.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'manage-component',
  providers: [BotService],
  templateUrl: 'app/manage/manage.component.html',
  styleUrls: ['app/manage/manage.component.css']
})

export class ManageComponent {
  constructor(private botService: BotService
  ) {}
 
  title = 'My Bots';
  
  bots: Bot[];
  selectedBot: Bot;
  
  activities: string [];
  selectedActivity: string;
  
  contacts: Object[];
  selectedContact: string;

  tasks: string [];
  selectedTask: string; 

  getBots(): void {
    this.botService.getBots().then(bots => this.bots = bots);
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

  onSelectContact(contact): void {
    this.selectedContact = contact;
  }

  onSelectTask(task): void {
    this.selectedTask = task;
  }

  ngOnInit(): void {
    this.getBots();
  }
}
