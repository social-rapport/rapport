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
  selector: 'activites-table',
  templateUrl: 'app/activities-table/activities-table.component.html',
  styleUrls: ['app/activities-table/activities-table.component.css']
})

export class ManageComponent {

  @ViewChild('myModal')
  modal: ModalComponent;

  title = 'My Bots';

  @Input() tasks: Array<Object>;

  constructor(private botService: BotService,
              private gmailService: GmailService,
              private router: Router,
              private store: Store) {

   var self = this;
   store.state.subscribe(function(){
     self.reload();
   })
  }