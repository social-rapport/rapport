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

  private fbUsername: String;
  private fbPassword: String;

  bots = [];
  selectedType;
<<<<<<< e1c9639f8f27903d85a19ed5043c10aff5271ec6

=======
>>>>>>> begins refactor

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
    } else {
      this.routeToManage(selectedType);
    }
  }

  private fbLogin(){
    this.router.navigate(['loading']);
    var self = this;
    this.fbService.login(this.fbUsername, this.fbPassword).then(()=>{
        this.close();
        this.routeToManage(this.selectedType);
    })
    .catch(()=>{
      this.router.navigate(['setup']);
      alert('there was an error');
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