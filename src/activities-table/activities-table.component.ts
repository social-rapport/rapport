import { Component, ViewChild, Input } from '@angular/core';
import { customBot, gmailContact } from '../shared/custom-type-classes';
import { BotService } from '../shared/bot.service';

@Component({
  selector: 'ActivitiesTable',
  templateUrl: 'app/activities-table/activities-table.component.html',
  styleUrls: ['app/activities-table/activities-table.component.css']
})

export class ActivitiesTable {

  @ViewChild('myModal')

  title = 'My Bots';

  @Input() tasks: Array<Object>;
  @Input() bots: Array<customBot>;
  @Input() clickFunction;

  constructor(private botService: BotService) {}
}