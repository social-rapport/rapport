import { Component, OnInit } from '@angular/core';
//import {BotService} from '../shared/bot.service';
import { Router } from '@angular/router';
import {BotService } from '../shared/bot.service';
@Component({
  moduleId: module.id,
  selector: 'setup-component',
  templateUrl: 'setup.component.html',
  styleUrls: ['setup.component.css']
})

export class SetupComponent {
  bots = []; 
  constructor(private botService: BotService, private router: Router) {
      botService.getBotTypes().then(types => {
        console.log('botTypes', types);
        this.bots = types;
      })
      //this.bots = botService.botTypes;
      // console.log("bot types", this.bots);
  }
  
  handleClick(selectedType){
    this.botService.addBotTypeToUser(selectedType);
    this.router.navigate(['manage']);
  }
  
}