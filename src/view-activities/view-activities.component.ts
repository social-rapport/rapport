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
  selector: 'view-activities',
  templateUrl: 'app/view-activities/view-activities.component.html',
  styleUrls: ['app/view-activities/view-activities.component.css']
})

export class ManageComponent {

  @ViewChild('myModal')
  modal: ModalComponent;

  title = 'My Bots';

  private scheduled;
  private recent;

  //
  constructor(private botService: BotService,
              private gmailService: GmailService,
              private router: Router,
              private store: Store){
    this.getActivities();
  }
  getActivities = function() {
    let userId = localstorage.getItem('user_id');

    return this.http.get(`/api/users/tasks?userId=${userId}`)
        .toPromise()
        .then(tasksObj => {
          this.scheduled = tasksObj.scheduled;
          this.recent = tasksObj.recent;
        });
  }
}
