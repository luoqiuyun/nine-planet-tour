import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { PlanetsComponent }      from './planets.component';
import { PlanetDetailComponent }  from './planet-detail.component';
import { PlanetService }          from './planet.service';
import { PlanetSearchComponent }  from './planet-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PlanetDetailComponent,
    PlanetsComponent,
    PlanetSearchComponent
  ],
  providers: [ PlanetService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
