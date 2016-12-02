import { Component, ViewChild } from '@angular/core';
import { customBot, gmailContact } from '../shared/custom-type-classes';
import { BotService } from '../shared/bot.service';


@Component({
  selector: 'ActivitiesContainer',
  templateUrl: 'app/view-activities/view-activities.component.html',
  styleUrls: ['app/view-activities/view-activities.component.css']
})

export class ActivitiesContainer {

  @ViewChild('myModal')

  title = 'My Bots';

  private allScheduled;
  private allRecent;
  private bots: Array<customBot>;

  private subscribedScheduled;
  private subscribedRecent;

  constructor(private botService: BotService){
    this.getTasks();
  }

  getTasks() {
    this.allScheduled = this.botService.scheduled;
    this.allRecent = this.botService.recent;
    this.bots = this.botService.userBots;

    this.subscribedRecent = this.allRecent;
    this.subscribedScheduled = this.allScheduled;
  }

  botFilter(arrayOfTasks, bot) {
    return arrayOfTasks.filter(task => {
      if(task.botName !== 'MyBot'){
        return task.botName === bot.botName;
      } else {
        return task.botType === bot.botType;
      }
    });
  }

  filterByBot(bot) {
    this.subscribedRecent = this.botFilter(this.allRecent, bot);
    this.subscribedScheduled = this.botFilter(this.allScheduled, bot);
  }
}
