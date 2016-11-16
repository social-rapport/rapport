import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'setup-component',
  templateUrl: 'setup.component.html',
  styleUrls: ['setup.component.css']
})

export class SetupComponent {
  constructor() {
      this.bots = [
      {id: 0, name: 'Default Bot', description: 'Our standard bot includes everything you need to keep it real'}, 
      {id: 1, name: 'Social Proof Bot', description: 'Impress others with frequent posts from bots to your facebook wall'}, 
      {id: 2, name: 'Stay in Touch Bot', description: "Stay in touch with people you don't have time for"},
      {id: 3, name: 'Customized Bot', description: 'Make your own bot'}
      ];
  }
  bots = []; 
  
}