import { Component,OnInit, Input} from '@angular/core';
import { gmailContact } from '../shared/custom-type-classes';
import { FilterContacts } from './contact.pipe';
import { BotService } from '../shared/bot.service';
import { GmailService} from '../shared/gmail.service';
import { FbService} from '../shared/fb.service';

@Component({
  selector: 'search-component',
  providers: [gmailContact, FilterContacts],
  styleUrls: ['app/search/search.component.css'],
  template: `<input type="text" [(ngModel)]="filterText">
<<<<<<< HEAD
              <ul>
                <li *ngFor="let contact of contacts | filterContacts: filterText" (click)="onAddContact(contact)"> {{ contact.vanity || contact.name }} </li>
=======
              <ul class="contact-list">
                <li *ngFor="let contact of contacts | filterContacts: filterText" (click)="onAddContact(contact)"> {{ contact.name }} </li>
>>>>>>> separate tables
              </ul>
            `,
})

export class SearchComponent {

  private contacts: any;

  constructor(private botService: BotService,
              private gmailService: GmailService,
              private fbService: FbService) {}

  onAddContact(selectedContact): void{
    let selectedContactIndex = this.contacts.indexOf(selectedContact);

<<<<<<< HEAD
    if(this.bot.botType === 'social'){
      this.bot.selectedFbFriends.push (selectedContact);
    } else {
      this.bot.selectedContacts.push ({
        name: selectedContact.name,
        email: selectedContact.email,
        birthday: null,
      });
    }
    
=======
    this.bot.selectedContacts.push ({
      name: selectedContact.name,
      email: selectedContact.email,
      birthday: null,
    });

>>>>>>> separate tables
    this.contacts.splice(selectedContactIndex,1);

  }

  ngOnInit(): void {

    if(this.bot.botType === 'social'){
      this.contacts = this.fbService.contacts; 
      const addedFriends = this.bot.selectedFbFriends.map(contact => contact.vanity);
      this.contacts = this.contacts.filter(contact => {
        return addedFriends.indexOf(contact.vanity) === -1;
      });
    } else {
      this.contacts = this.gmailService.contacts.filter(contact => {
        const selectedContactNames = this.bot.selectedContacts.map(contact => contact.name);
        return contact.name && contact.email && selectedContactNames.indexOf(contact.name) === -1;
      });
    }

  }

  @Input() bot;

}