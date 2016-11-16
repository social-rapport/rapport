import { Component, OnInit } from '@angular/core';
//import {BotService} from '../shared/bot.service';
import { Router } from '@angular/router';
import {BotService } from '../shared/bot.service';
@Component({
  moduleId: module.id,
  selector: 'setup-component',
  //providers: [BotService],
  templateUrl: 'setup.component.html',
  styleUrls: ['setup.component.css']
})

export class SetupComponent {
  bots = []; 
  constructor(private BotService: BotService, private router: Router) {
      var self = this;
      BotService.getBotTypes().then(function(types){
        console.log('botTypes', types);
        self.bots = types;
      })
  }
  
  handleClick(selectedType){
    this.BotService.addBotTypeToUser(selectedType);
    console.log("updated userBots", this.BotService.userBots);
    this.router.navigate(['manage']);
  }
  
}