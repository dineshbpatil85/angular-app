import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flight',
})
export class FlightPipe implements PipeTransform {
    transform(flights: any, searchText: any): any {
		if(searchText == null || searchText == '') return flights;
		return flights.filter(function(flight){		  
		  return (flight.totalPrice <= searchText)?flight:null;
		})
	}
}