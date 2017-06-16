import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Planet }        from './planet';
import { PlanetService } from './planet.service';

@Component({
  selector: 'planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: [ './planet-detail.component.css' ]
})
export class PlanetDetailComponent implements OnInit {
  planet: Planet;

  constructor(
    private planetService: PlanetService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.planetService.getPlanet(+params['id']))
      .subscribe(planet => this.planet = planet);
  }

  save(): void {
    this.planetService.update(this.planet)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
