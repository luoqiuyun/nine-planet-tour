import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Planet } from './planet';

@Injectable()
export class PlanetService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private planetsUrl = 'api/planets';  // URL to web api

  constructor(private http: Http) { }

  getPlanets(): Promise<Planet[]> {
    return this.http.get(this.planetsUrl)
               .toPromise()
               .then(response => response.json().data as Planet[])
               .catch(this.handleError);
  }


  getPlanet(id: number): Promise<Planet> {
    const url = `${this.planetsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Planet)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.planetsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Planet> {
    return this.http
      .post(this.planetsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Planet)
      .catch(this.handleError);
  }

  update(planet: Planet): Promise<Planet> {
    const url = `${this.planetsUrl}/${planet.id}`;
    return this.http
      .put(url, JSON.stringify(planet), {headers: this.headers})
      .toPromise()
      .then(() => planet)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

