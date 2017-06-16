import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let planets = [
      {id: 11, name: 'Mercury', desc: 'The Swiftest Planet'},
      {id: 12, name: 'Venus', desc: 'Planetary Hot Spot'},
      {id: 13, name: 'Earth', desc: 'Our Home Planet'},
      {id: 14, name: 'Mars', desc: 'The Red Planet'},
      {id: 15, name: 'Jupiter', desc: 'King of the Planets'},
      {id: 16, name: 'Saturn', desc: 'Jewel of Our Solar System'},
      {id: 17, name: 'Uranus', desc: 'The Sideways Planet'},
      {id: 18, name: 'Neptune', desc: 'The Windiest Planet'},
      {id: 19, name: 'Sun', desc: 'The largest object in the solar system'}
    ];
    return {planets};
  }
}
