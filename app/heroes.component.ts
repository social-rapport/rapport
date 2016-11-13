import { Component } from '@angular/core';
import { Hero } from './hero';
import { Auth } from './auth.service';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  providers: [Auth, HeroService],
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css']
})

export class HeroesComponent {
  constructor(private auth: Auth, private heroService: HeroService, 
  private router: Router
  ) {}
 

  title = 'Tour of Heroes';
  heroes: Hero[];

  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  gotoDetail(): void {
   this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
