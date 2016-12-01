import { Component, ViewChild } from '@angular/core';
import { customBot, gmailContact } from '../shared/custom-type-classes';
//change
import { BotService } from '../shared/bot.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GmailService} from '../shared/gmail.service';
import {FbService} from '../shared/fb.service';

import { ContactComponent } from '../contact/contact.component';
import { SearchComponent } from '../search/search.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Store } from '../shared/store';

@Component({
  selector: 'manage-component',
  templateUrl: 'app/manage/manage.component.html',
  styleUrls: ['app/manage/manage.component.css']
})

export class ManageComponent {

  @ViewChild('myModal')
  modal: ModalComponent;



  title = 'My Bots';

  private bots: Array<customBot>;
  private selectedBot: customBot;
  private selectedTask;
  private subTask;
  private displayMessage;
  private customMessage;
  private customInterval;
  private customDate;
  private activities: Array<string>;
  private contacts: Array<gmailContact>;
  private tasks: Array<string>;
  private mode = "bot";
  private scheduled;
  private editabelName;
  private customBotName;
  private recent; 
  private uiVars = {newContact:{name: "", string: ""},
                    editContact: "",
                    success: false,
                    };
  //
  constructor(private botService: BotService,
              private gmailService: GmailService,
              private router: Router,
              private store: Store) {

   var self = this;
   store.state.subscribe(function(){
     self.reload();
   })


  }

   //<-------------------DISPLAY MODE------------------->
  pageMode(mode){
    this.mode = mode;
  }

  //<-------------------TASK METHODS------------------->
  close() {
    this.modal.close();
    this.selectedTask = null;
  }

  saveTask(){
    if(this.selectedTask.task === 'sayHappyHolidayGmail'){
      var opts = {name: this.subTask, message: this.customMessage};
      this.botService.addNewHolidayTask(opts, this.selectedBot);
    } else {
      this.customMessage? this.selectedTask.message = this.customMessage: 1;
      this.customInterval? this.selectedTask.interval = this.customInterval: 1;
      this.customDate? this.selectedTask.date = this.customDate: 1;
    }
    this.reload();
    this.tasks = this.selectedBot.tasks;
  }

  open(task) {
    this.selectedTask = task;
    this.customMessage = this.selectedTask.message;
    this.customInterval = this.selectedTask.interval;
    this.customDate = this.selectedTask.date;
    this.modal.open();
  }

   private canSetDate(){
    return this.selectedTask && this.selectedTask.task !== 'sayHappyBirthdayGmail';
  }

  //<-------------------BOT METHODS------------------->

  private onSelectBot(bot: any): void {
    this.selectedBot = bot;
    this.activities = bot.botActivity.recent;

    //these contacts are the selectedContacts for the bot, not the availableContacts
    //should be componentized
    if(this.selectedBot.botType === 'social'){
      this.contacts = bot.selectedFbFriends;
    } else {
      this.contacts = bot.selectedContacts;
    }
    this.tasks = bot.tasks;
  }

  private submitAllSettings(): void{
    var self = this;
    this.botService.updateBots(this.bots).then(_=>{
      this.reload();
      if(!this.selectedBot.id){
        this.selectedBot = this.bots[this.bots.length-1];
      }
      this.showSuccess(); 
    })
  }

  private showSuccess(){
    var self = this;
    this.uiVars.success = true;
    setTimeout(function(){
      self.uiVars.success = false;
    },1000);
  }

  private retireBot(bot): void {
    var self =this;
    this.botService.retireBot(this.selectedBot).then(_=>{
      this.reload();
      if(this.bots.length === 0){
        self.router.navigate(['setup']);
      } else {
        this.showSuccess(); 
      }
    })
  }

  //<-----------------ADD CONTACTS METHODS----------------->

  createNewContact(contact){
    this.selectedBot.selectedContacts.push(contact);
  }

  //<-----------------SELECTED CONTACTS METHODS----------------->

  private removeSelectedContact(contact): void{
    var i = this.contacts.indexOf(contact);
    this.contacts.splice(i,1);
    if(this.selectedBot.botType === 'social'){
      this.botService.removeSelectedFbContact(contact).then(_=>{
        this.reload();
      })
    } else {
      this.botService.removeSelectedContact(contact).then(_=>{
        this.reload();
      })
    }
  }



  private sendNow(): void {
    this.botService.sendNow()
      .then(console.log);
  }

  private reload() : void {
    this.scheduled = this.botService.scheduled;
    this.recent = this.botService.recent;
    this.bots = this.botService.userBots;
    if(this.selectedBot){
      this.tasks = this.selectedBot.tasks;
    }
  }

  private ngOnInit(): void {
    this.reload();
    this.onSelectBot(this.bots[0]);
  }

}
