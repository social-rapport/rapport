import { Component, Output, EventEmitter } from '@angular/core';
import { OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/auth.service';
import { GmailLoginComponent } from '../gmail-login/gmail-login.component';
import { gmailContact } from '../shared/contact';
import { Contact } from '../shared/contact.service';
import { FilterContacts } from './contact.pipe';

@Component({
  selector: 'search-component',
  providers: [gmailContact, Contact, FilterContacts],
  styleUrls: ['app/search/search.component.css'],
  template: `<input type="text" [(ngModel)]="filterText">
              <ul>
                <li *ngFor="let contact of contacts | filterContacts: filterText" (click)="onAddContact(contact)"> {{ contact.name }} </li>
              </ul>
  `,
})
export class SearchComponent {

  //contact service added
  constructor(private contact: Contact) {}

  private contacts: Array<gmailContact>;

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
    this.contact.getContacts()
      .subscribe(
        data => this.contacts = data.filter(contact => contact.name && contact.email),
        error => console.log("error retrieving contacts", error),
        () => console.log("finished retrieving contacts", this.contacts)
      );
  }

  @Input() bot;

}