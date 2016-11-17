import { Component,OnInit, Input } from '@angular/core';
import { gmailContact } from '../shared/contact';
import { Contact } from '../shared/contact.service';

@Component({
  selector: 'search-component',
  providers: [gmailContact, Contact],
  styleUrls: ['app/search/search.component.css'],
  template: `<input type="text" [(ngModel)]="filterText">
              <ul>
                <li *ngFor="let task of tasks | filterContacts: filterText" (click)="onAddContact(contact)"> {{ contact.name }} </li>
              </ul>
  `,
})
export class SearchComponent {

  constructor(private contact: Contact) {}

  private tasks: Array<string>;

  onAddContact(selectedContact): void{
    console.log('selectedContact',selectedContact);
    this.bot.selectedContacts.push ({
      name: selectedContact.name,
      email: selectedContact.email,
      birthday: null,
    });
    console.log('bot updated',this.bot);
  }

  ngOnInit(): void {

  }

  @Input() bot;

}