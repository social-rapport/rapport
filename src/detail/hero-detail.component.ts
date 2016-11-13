import { Hero } from '../shared/hero';
// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from '../shared/hero.service';


  @Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
  })

export class HeroDetailComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }
  goBack(): void {
        this.location.back();
  }

  @Input()
  hero: Hero;
}

// import { Component, Input } from '@angular/core';
// import { Hero } from './hero';
// @Component({
//   selector: 'my-hero-detail',
//   template: `
//     <div *ngIf="hero">
//       <h2>{{hero.name}} details!</h2>
//       <div>
//         <label>id: </label>{{hero.id}}
//       </div>
//       <div>
//         <label>name: </label>
//         <input [(ngModel)]="hero.name" placeholder="name"/>
//       </div>
//     </div>
//   `
// })
// export class HeroDetailComponent {
//   @Input() hero: Hero;
// }

