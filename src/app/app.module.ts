import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FlightsComponent } from './flights/flights.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FlightPipe} from './flight.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
	FlightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
	HttpClientModule,
	Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
