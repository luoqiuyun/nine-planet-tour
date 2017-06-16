import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Planet }     from './planet';

@Injectable()
export class PlanetSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Planet[]> {
    return this.http
               .get(`app/planets/?name=${term}`)
               .map(response => response.json().data as Planet[]);
  }
}
