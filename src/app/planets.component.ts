import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Planet }            from './planet';
import { PlanetService }     from './planet.service';

@Component({
  selector: 'my-planets',
  templateUrl: './planets.component.html',
  styleUrls: [ './planets.component.css' ]
})
export class PlanetsComponent implements OnInit {
  planets: Planet[];
  selectedPlanet: Planet;

  constructor(
    private planetService: PlanetService,
    private router: Router) { }

  getPlanets(): void {
    this.planetService
        .getPlanets()
        .then(planets => this.planets = planets);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.planetService.create(name)
      .then(planet => {
        this.planets.push(planet);
        this.selectedPlanet = null;
      });
  }

  delete(planet: Planet): void {
    this.planetService
        .delete(planet.id)
        .then(() => {
          this.planets = this.planets.filter(h => h !== planet);
          if (this.selectedPlanet === planet) { this.selectedPlanet = null; }
        });
  }

  ngOnInit(): void {
    this.getPlanets();
  }

  onSelect(planet: Planet): void {
    this.selectedPlanet = planet;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPlanet.id]);
  }
}
