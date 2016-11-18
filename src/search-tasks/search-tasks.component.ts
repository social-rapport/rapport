import { Component, OnInit, Input} from '@angular/core';
import { BotService } from '../shared/bot.service';

@Component({
  selector: 'search-component',
  providers: [],
  styleUrls: ['app/search/search-tasks.component.css'],
  template: `<input type="text" [(ngModel)]="filterText">
              <ul>
                <li *ngFor="let task of tasks | filterTasks: filterText" (click)="onAddTask(task)"> {{ task }} </li>
              </ul>
  `,
})
export class SearchTasksComponent {

  private tasks: Array<string>;

  constructor(private botService: BotService) {}

  onAddTask(selectedTask): void{
    let selectedTaskIndex = this.tasks.indexOf(selectedTask);
    this.bot.tasks.push (selectedTask);
    this.tasks.splice(selectedTaskIndex,1);
  }

  ngOnInit(): void {
    this.tasks = this.botService.tasks.filter(task => {
     return this.bot.tasks.indexOf(task) === -1;
    }); 
  }

  @Input() bot;

}