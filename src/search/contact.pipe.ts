import { Pipe, PipeTransform } from '@angular/core';
import { gmailContact } from '../shared/custom-type-classes';

@Pipe({name: 'filterContacts'})
export class FilterContacts implements PipeTransform {

  transform(contacts: Array<gmailContact>, searchText: string) {
    if(!searchText) {
      return contacts;

    } else if (contacts) {
      searchText = searchText.toLowerCase();

      return contacts.filter(contact => {
        if(contact.name.toLowerCase().indexOf(searchText) !== -1 || contact.email.toLowerCase().indexOf(searchText) !== -1) {
          return true
        }
      });

    }
  }

}