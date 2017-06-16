import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { PlanetSearchService } from './planet-search.service';
import { Planet } from './planet';

@Component({
  selector: 'planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: [ './planet-search.component.css' ],
  providers: [PlanetSearchService]
})
export class PlanetSearchComponent implements OnInit {
  planets: Observable<Planet[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private planetSearchService: PlanetSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.planets = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.planetSearchService.search(term)
        // or the observable of empty planets if there was no search term
        : Observable.of<Planet[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Planet[]>([]);
      });
  }

  gotoDetail(planet: Planet): void {
    let link = ['/detail', planet.id];
    this.router.navigate(link);
  }
}
