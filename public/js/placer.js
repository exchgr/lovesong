//DOING EXACTLY WHAT THE FUNCTIONS ASK




var map;
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
		
		var pyrmont = new google.maps.LatLng(latlong[0],latlong[1]);
	
		var map = new google.maps.Map(document.getElementById('map'), { //CHANGE THIS ID TO WHAT MOIRI USED
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: pyrmont,
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
	getLandmarks: function(dest, nextfunction) {
	
		var landmarks = [];
	
		$(document).ready(function() {
		
			$.ajax({
				method: 'GET',
				dataType: 'json',
				data: {
					'user_id':'TEST_USER',
					'api_key':'EXAMPLE_KEY_3edaba1953abf86',
					'fields': 'items/summary,items/description,items/start,items/end,items/description',
					'lat':dest[0],
					'lon':dest[1]
					},
				url: 'http://api.geckolandmarks.com/',
			success: function(data, status) {
			//processing
			
				if (status == 200) {
					
					alert (data);
					for (var i = 0; i < data.length; i++) {
						landmarks.push({
						name:data[i].name,
						latlong: pyrmont,
						importance: i //or i+1, Moiri seems to use 0
						})	
					
					}
				
				}
			
			}
			});
			
	});
	},
	
	// given a latilong( lat, long), and precision, returns the "best" landmark from getLandmarks
	// just returns the first one now
	// Precision from 1 to 10, 1 - very precise
	getLandmark: function( destlong, precision, nextfunction ) {
	
		var pyrmont = new google.maps.LatLng(destlong[0],destlong[1]);
	
		var map = new google.maps.Map(document.getElementById('map'), { //CHANGE THIS ID TO WHAT MOIRI USED
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: pyrmont,
			zoom: 15
		});

		
		var service = new google.maps.places.PlacesService(map);

		if (precision <= 0) {
			var precision = 1;
		}
		
		var request = {
			location: pyrmont,
			radius: precision * 100
			}
			
		if (precision <= 10) {
			request.types = local;
		}
		else {
			request.types = global;
		}
		
		service.nearbySearch(request, callback);
		
		function callback (data, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				nextfunction ({
					name:data[0].name,
					latlong: pyrmont,
					importance: 0 //or precision
					})
			}
		}
		
	}
}