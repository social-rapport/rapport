import { Component, OnInit, ViewChild } from '@angular/core';
//import {BotService} from '../shared/bot.service';
import { Router } from '@angular/router';
import {BotService } from '../shared/bot.service';
import {FbService} from '../shared/fb.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'setup-component',
  templateUrl: 'setup.component.html',
  styleUrls: ['setup.component.css']
})

export class SetupComponent {

  private fbUsername: String;
  private fbPassword: String;
  bots = []; 
  selectedType;

  @ViewChild('myModal')
  modal: ModalComponent;

  close() {
      this.modal.close();
  }

  open() {
      this.modal.open();
  }

  constructor(private botService: BotService, 
              private router: Router, 
              private fbService: FbService) 
    {
      botService.getBotTypes().then(types => {
        console.log('botTypes', types);
        this.bots = types;
    })
  }

  private handleClick(selectedType){
    this.selectedType = selectedType;

    //if the fbService has no contacts, get the users fb auth info
    if(selectedType.botType === 'social' && !this.fbService.contacts){
      this.open();
    } else {
      this.routeToManage(selectedType);
    }
  }

  private fbLogin(){
    var self = this;
    this.fbService.login(this.fbUsername, this.fbPassword).then(()=>{
        this.close();
        this.routeToManage(this.selectedType);
    });
  }

  private routeToManage(selectedType){
    this.botService.addBotTypeToUser(selectedType);
    this.router.navigate(['manage']);
  }
  
}