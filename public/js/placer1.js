//DOING EXACTLY WHAT THE FUNCTIONS ASK

var service;

var local = ['beauty_salon','book_store','car_dealer','car_wash','clothing_store','food','furniture_store','gas_station',
	'grocery_or_supermarket','home_goods_store','insurance_agency','jewelry_store','meal_delivery','meal_takeaway','movie_theater',
	'moving_company','night_club','parking','pet_store','pharmacy','post_office','real_estate_agency','restaurant','roofing_contractor',
	'school','shoe_store','spa','storage','store','subway_station','taxi_stand','train_station','travel_agency','university','veterinary_care'];
	
var global = ['airport','amusement_park','aquarium','art_gallery','bank','bowling_alley','bus_station','campground','casino',
	'cemetery','church','city_hall','courthouse','embassy','establishment','finance','fire_station','funeral_home','hindu_temple',
	'hospital','library','local_government_office','mosque','museum','park','parking','place_of_worship','police','rv_park','school',
	'shopping_mall','stadium','synagogue','train_station','zoo'];
	
//take the map and the service definitions out, when connecting to Moiri's maps.Map!

var placer = {

	// given a large thing
	// returns a neighborhood
	
	getNeighborhood: function(latlong, nextfunction) {
		
		var center = new google.maps.LatLng(latlong[0],latlong[1]);
	
		var map = new google.maps.Map(document.getElementById('map'), { //CHANGE THIS ID TO WHAT MOIRI USED
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: center,
			zoom: 15
		});
		
		var service = new google.maps.places.PlacesService(map);

	
		var request = {
			radius:1000, //just to make sure
			location:new google.maps.LatLng(latlong[0],latlong[1]),
			rankby:'distance',
		}
		
		service.nearbySearch(request, callback);
		
		function callback (data, status) {
			//process data here
			
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				var i = 0;
				while (i <= 20 && i <= data.length) { //search through the first page of results
					if (data[i].vicinity) { //return first result that contains vicinity, otherwise - none
						nextfunction(data[i].vicinity);
						return false;
					}
				}
				// return 'not found';    ?
			}		
		}
	},
	
	// given landmark, and precision
	// 	precision: 0 (low - general vicinity), 1 (high - for directions), or 2 (high -for very large one)
	// passes an array of landmark objects — ranked by "landmarkiness" and "proximity"

	//nextfunction - pass the name of the function that handles landmarks further

	getLandmarks: function(dest, precision, nextfunction, all) {
	
		var center = new google.maps.LatLng(dest[0],dest[1]);
	
		// var map = new google.maps.Map(document.getElementById('map'), { //CHANGE THIS ID TO WHAT MOIRI USED
			// mapTypeId: google.maps.MapTypeId.ROADMAP,
			// center: center,
			// zoom: 15
		// });

		var landmarks = [];
		
		var service = new google.maps.places.PlacesService(map);
		
		var request = {location: center}
		
		switch(precision) { 
			case 0:
			    request.radius=700;
				request.types=global;
				break;
			case 1:
			    request.radius=100;
				request.types=local;
				break;				
			case 2:
			    request.radius=100;
				request.types=global;
				break;			
			default:
			    request.radius=1500;
				request.types=global;			
			}
		
		service.nearbySearch(request, callback);
		
		function callback (data, status) {
			//process data here
			//document.write(JSON.stringify(data));
			
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < data.length; i++) {
					landmarks.push({
					name:data[i].name,
					latlong: center,
					importance: i //or i+1, Moiri seems to use 0
					});
				}
			}
			
			if (all) nextfunction(landmarks); //can use callback function to pass to next processor of the landmarks (mapper?)	
			else nextfunction([landmarks[0]]);			
			/*else {
				return;
			}*/
			//should there be an empty return?
			
		}
	},
	
	// given a latilong( lat, long), and precision, returns the "best" landmark from getLandmarks
	// just returns the first one now
	// Precision from 1 to 10, 1 - very precise
	getLandmark: function( destlong, precision, nextfunction ) {
		placer.getLandmarks(destlong, precision, nextfunction, false);
	}
}