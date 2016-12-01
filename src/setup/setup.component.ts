import { Component, OnInit, ViewChild } from '@angular/core';
//import {BotService} from '../shared/bot.service';
import { Router } from '@angular/router';
import {BotService } from '../shared/bot.service';
import {FbService} from '../shared/fb.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Store } from '../shared/store';

@Component({
  moduleId: module.id,
  selector: 'setup-component',
  templateUrl: 'setup.component.html',
  styleUrls: ['setup.component.css']
})

export class SetupComponent {

  private fbUsername: String ='nickspinosa1022@gmail.com';
  private fbPassword: String ='cichlid1111';
  private uiVars = {
    invalid: false,
    loading: false,
  }
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

  @ViewChild('powerModal')
  powerModal: ModalComponent;

  closePower() {
      this.powerModal.close();
  }

  openPower() {
      this.powerModal.open();
  }

  constructor(private botService: BotService,
              private router: Router,
              private fbService: FbService,
              private store: Store)
    {
    this.bots = JSON.parse(JSON.stringify(botService.botTypes));
  }

  private handleClick(selectedType){
    this.selectedType = selectedType;

    //if the fbService has no contacts, get the users fb auth info
    if(selectedType.botType === 'social' && !this.fbService.contacts){
      this.open();
    } else if(selectedType.botType === 'power'){
      this.openPower();
    } else {
      this.routeToManage(selectedType);
    }
  }

  private fbLogin(){
    var self = this;
    this.uiVars.loading = true;
    this.fbService.login(this.fbUsername, this.fbPassword).then(()=>{
        this.routeToManage(this.selectedType);
    })
    .catch(()=>{
      this.fbPassword = "";
      this.fbUsername = "";
      this.uiVars.loading = false;
      this.uiVars.invalid = true;
    })
  }

  private routeToManage(selectedType){
    if(selectedType.botType === 'power'){
      this.router.navigate(['loading']);
        this.botService.addBotTypeToUser(selectedType);
        this.router.navigate(['manage']);
    } else {
      this.store.addBot(selectedType);
      this.botService.addBotTypeToUser(selectedType);
      this.router.navigate(['manage']);
    }
  }

}