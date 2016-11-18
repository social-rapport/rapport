import { Component,OnInit, Input} from '@angular/core';
import { gmailContact } from '../shared/contact';
import { FilterContacts } from './contact.pipe';
import { BotService } from '../shared/bot.service';

@Component({
  selector: 'search-component',
  providers: [gmailContact, FilterContacts],
  styleUrls: ['app/search/search.component.css'],
  template: `<input type="text" [(ngModel)]="filterText">
              <ul>
                <li *ngFor="let contact of contacts | filterContacts: filterText" (click)="onAddContact(contact)"> {{ contact.name }} </li>
              </ul>
  `,
})
export class SearchComponent {

  private contacts: Array<gmailContact>;

  constructor(private botService: BotService) {}

  onAddContact(selectedContact): void{
    let selectedContactIndex = this.contacts.indexOf(selectedContact);
    this.bot.selectedContacts.push ({
      name: selectedContact.name,
      email: selectedContact.email,
      birthday: null,
    });
    this.contacts.splice(selectedContactIndex,1);
  }

  ngOnInit(): void {
    this.contacts = this.botService.contacts.filter(contact => {
     const selectedContactNames = this.bot.selectedContacts.map(contact => contact.name);
     return contact.name && contact.email && selectedContactNames.indexOf(contact.name) === -1;
    }); 
  }

  @Input() bot;

}