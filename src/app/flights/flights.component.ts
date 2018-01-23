import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  searchData:any = [];
	
	noFlight:boolean = false;
	passengers:number = 0;
	tripType:string = "";
  constructor() { }

  ngOnInit() {


  }

   searchOneWay = function(oneWay){
      this.searchData = [];
      for ( var i in this.result ) {			
        if (typeof this.result[i] == 'object' && i.toLowerCase() == (oneWay.origin).toLowerCase()) {
          for ( var j in this.result[i] ) {
            if (j.toLowerCase() == (oneWay.destination).toLowerCase()) {
              for ( var k in this.result[i][j]){							
                if((this.result[i][j][k].oneway.date).includes(oneWay.departDate) ==  true ){
                  delete this.result[i][j][k].roundtrip;
                  this.searchData.push(this.result[i][j][k]);
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

    searchRoundTrip = function(roundTrip){
      this.searchData = [];
      for ( var i in this.result ) {			
        if (typeof this.result[i] == 'object' && i.toLowerCase() == (roundTrip.origin).toLowerCase()) {
          for ( var j in this.result[i] ) {
            if (j.toLowerCase() == (roundTrip.destination).toLowerCase()) {
              for ( var k in this.result[i][j]){							
                if((this.result[i][j][k].oneway.date).includes(roundTrip.departDate) ==  true && (this.result[i][j][k].roundtrip.date).includes(roundTrip.returnDate) ==  true){								
                  this.searchData.push(this.result[i][j][k]);
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
