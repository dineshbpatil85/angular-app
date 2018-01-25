import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
     

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	result:any = {};
	searchData:any = [];
	oneWayTripData:any = {};
	roundTripData:any = {};
	searchBox:boolean=false;
	oneWay:any = [];
	roundTrip:any = [];
	noFlight:boolean = false;
	passengers:number = 0;
	tripType:string = "";
	records:any = [];
	constructor( private http: HttpClient ) { }
	
	ngOnInit() {
		this.http.get("../assets/flight-data.json").subscribe(data => {
			// Read the result field from the JSON response.
			this.result = data;			
			//this.oneWay.departDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
		});		
	}

	//Search Flights for Oneway Trip
	searchOneWay = function(oneWay){
		this.searchData = [];				
		this.oneWayTripData = JSON.parse(JSON.stringify( this.result ));
		for ( var i in this.oneWayTripData ) {			
			if (typeof this.oneWayTripData[i] == 'object' && i.toLowerCase() == (oneWay.origin).toLowerCase()) {
				for ( var j in this.oneWayTripData[i] ) {
					if (j.toLowerCase() == (oneWay.destination).toLowerCase()) {
						for ( var k in this.oneWayTripData[i][j]){							
							if((this.oneWayTripData[i][j][k].oneway.date).includes(oneWay.departDate) ==  true ){								
								delete this.oneWayTripData[i][j][k].roundtrip;								
								this.oneWayTripData[i][j][k]['totalPrice'] = (this.oneWayTripData[i][j][k].oneway.price * oneWay.passengers);
								this.searchData.push(this.oneWayTripData[i][j][k]);								
							}
						}
					}
				}
				this.passengers = oneWay.passengers;
				this.searchBox = true;
				this.tripType = "oneway";							
				if(this.searchData.length == 0){this.noFlight = true;}else{this.noFlight = false;	}
				
			}else{
				this.noFlight = true;
			}
        }
	}

	//Search Flights for Round Trip
	searchRoundTrip = function(roundTrip){
		this.searchData = [];
		this.roundTripData = JSON.parse(JSON.stringify( this.result ));
		for ( var i in this.roundTripData ) {			
			if (typeof this.roundTripData[i] == 'object' && i.toLowerCase() == (roundTrip.origin).toLowerCase()) {
				for ( var j in this.roundTripData[i] ) {
					if (j.toLowerCase() == (roundTrip.destination).toLowerCase()) {
						for ( var k in this.roundTripData[i][j]){							
							if((this.roundTripData[i][j][k].oneway.date).includes(roundTrip.departDate) ==  true && (this.roundTripData[i][j][k].roundtrip.date).includes(roundTrip.returnDate) ==  true){								
								this.roundTripData[i][j][k]['totalPrice'] = ((this.roundTripData[i][j][k].oneway.price + this.roundTripData[i][j][k].roundtrip.price) * roundTrip.passengers);
								this.searchData.push(this.roundTripData[i][j][k]);
								console.log(this.searchData);
							}
						}
					}
				}
				this.passengers = roundTrip.passengers;
				this.searchBox = true;
				this.tripType = "roundtrip";
				if(this.searchData.length == 0){this.noFlight = true;}else{this.noFlight = false;	}
			}else{
				this.noFlight = true;
			}
        }
	}
}
