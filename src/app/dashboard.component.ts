import { Component, OnInit } from '@angular/core';

import { Planet }        from './planet';
import { PlanetService } from './planet.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  planets: Planet[] = [];

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.planetService.getPlanets()
      .then(planets => this.planets = planets.slice(1, 5));
  }
}
