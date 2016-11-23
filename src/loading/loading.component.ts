import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['app/home-page/home.component.css'],
  template: `<div><img src="http://phylo.cs.mcgill.ca/assets/img/loading.gif"/>Loading Your Personalized Bots</div>`
})
export class LoadingComponent {
  constructor() {}

  ngOnInit(): void {
    console.log("loading called");
  }

}