import { Pipe, PipeTransform } from '@angular/core';
import { gmailContact } from '../shared/custom-type-classes';

@Pipe({name: 'filterContacts'})
export class FilterContacts implements PipeTransform {

  transform(contacts: any, searchText: string) {
    if(!searchText) {
      return contacts;

    } else if (contacts) {
      console.log("contacts", contacts);
      searchText = searchText.toLowerCase();

      if(contacts[0].fullName) {
        console.log("social pipe");
         return contacts.filter(contact => {
          if(contact.fullName.toLowerCase().indexOf(searchText) !== -1 || contact.vanity.toLowerCase().indexOf(searchText) !== -1) {
            return true
          }
        });

      } else {
        console.log("gmail pipe");
        return contacts.filter(contact => {
          if(contact.name.toLowerCase().indexOf(searchText) !== -1 || contact.email.toLowerCase().indexOf(searchText) !== -1) {
            return true
          }
        });
      }
      

    }
  }

}