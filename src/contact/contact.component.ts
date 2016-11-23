import { gmailContact } from '../shared/custom-type-classes';
// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';

  @Component({
    moduleId: module.id,
    selector: 'contact-component',
    templateUrl: './contact.component.html',
    styleUrls: ['contact.component.css']
  })

export class ContactComponent {
  constructor() {
  }

  removeSelectedContact(){
    this.contact.active = true;
  }

  @Input() contact;

}


