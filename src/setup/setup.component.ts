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

    if(selectedType.botType === 'social'){
      this.open();
    } else {
      this.routeToManage(selectedType);
    }
  }

  private fbLogin(){
    let userId = localStorage.getItem('user_id');
    console.log("userId", userId);
    this.fbService.saveCredentials(this.fbUsername, this.fbPassword)
      .then(() =>{
          this.fbService.getContacts(userId)
            .then(friends => {
              console.log("friends loaded", friends);
              this.close();
              this.routeToManage(this.selectedType);
            });
      });
  }

  private routeToManage(selectedType){
    this.botService.addBotTypeToUser(selectedType);
    this.router.navigate(['manage']);
  }
  
}