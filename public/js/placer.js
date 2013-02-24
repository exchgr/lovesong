//DOING EXACTLY WHAT THE FUNCTIONS ASK
	
//take the map and the service definitions out, when connecting to Moiri's maps.Map!

var bigger = ['AC', 'AC-a', 'AC-h', 'AC-r','BA', 'BU', 'CI', 'EM', 'EN', 'EN-c', 'ED-e', 'ED-h', 'ED-p', 'ED-u', 'EM', 'EN', 'EN-b', 'EN-c', 'EN-d', 'EN-p', 
'GA', 'GO', 'HE','MA','MP','MU','PL','PO','PR','RE','RE-c','RE-i', 'RS', 'RS-a','RS-c','RS-d','RS-e','RS-f','RS-i','RS-j','RS-k','RS-m','RS-n','RS-s','RS-t','RS-v', 'SA',
'SA-f','SA-m','SA-p', 'SD','SH','SH-m','SH-s','SP','SU','TR','TR-a','TR-b','TR-n','TR-m'];

var important = ['BR', 'EM', 'GO', 'MA', 'PL', 'MU', 'PR', 'SH', 'SH-m', 'TR', 'TR-A','TR-h', 'TR-m', 'TR-h', 'HE', 'RE', 'RE-c', 'RE-i']; 

var placer = {

	// given a large thing
	// returns a neighborhood
	getNeighborhood: function(map, latlong, nextfunction) {
		
		var service = new google.maps.places.PlacesService(map);
	
		var request = {
			radius:50000, //just to make sure
			location:latlong,
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
						i++;
						return false
					}
				}
				return 'No neighborhood data';
			}		
		}
	},
	
	count: 0,
	fakeData: [{
	      "ccode": "AE",
	      "class": "P",
	      "dist": 0.16964427405665916,
	      "id": "478605",
	      "lat": 24.482645988464355,
	      "lon": 54.36206817626953,
	      "name1": "Ghanem Bin Hamooda Mosque",
	      "name2": "Abu Dhabi City",
	      "name3": "Abu Dhabi",
	      "subclass": "RE-i"
	    },
	    {
	      "ccode": "AE",
	      "class": "P",
	      "dist": 0.1736284095147284,
	      "id": "475944",
	      "lat": 24.48406219482422,
	      "lon": 54.35906410217285,
	      "name1": "Etisalat Headquaters Building A",
	      "name2": "Abu Dhabi City",
	      "name3": "Abu Dhabi",
	      "subclass": "BU"
	    }],
	
	// given landmark, and precision
	// 	precision: 0 (very close, any type), 1 (close, bigger landmark), or 2 (important landmark)
	// passes an array of landmark objects — ranked by "landmarkiness" and "proximity"
	
	//nextfunction - pass the name of the function that handles landmarks further
	getLandmarks: function(map, dest, precision, all, nextfunction) {
		// var resource;
		// 		if (placer.count == 1 || placer.count == 2) {
		// 			// Return data 1
		// 			resource = placer.fakeData[0];
		// 		} else if (placer.count == 3) {
		// 			// Return data 2
		// 			resource = placer.fakeData[1];
		// 		} else {
		// 			//return nextFunction();
		// 		}
		// 		placer.count++;
		// 		if (resource) {
		// 			var obj = {
		// 	        name:resource.name1,
		// 	        latlong: new google.maps.LatLng(resource.lat,resource.lon),
		// 	        importance: 0 //or i+1, Moiri seems to use 0
		// 	    };
		// 			nextfunction([obj]);
		// 		}
		$.ajax({

			method: 'GET',
			dataType: 'json',
			data: {
				'user_id':'TEST_USER',
				'api_key':'EXAMPLE_KEY_3edaba1953abf86',
				'count':1, //play with the value
				'lat':dest.lat(),
				'lon':dest.lng()
				},
			//url: '/landmarkr/public/js/1.json',
		    url: 'json',

		    success: function(data, status){
					var status = 200;
			    if (status == 200) {
			        var resource = data.landmarks;
							//console.log( data );
			        var landmarks = [];
			        for (var i = 0; i < resource.length; i++) {
			            if (resource[i].class == 'P') {
			                // console.log(  resource[i].lat  );
			                var obj = {
			                    name:resource[i].name1,
			                    latlong: new google.maps.LatLng(resource[i].lat,resource[i].lon),
			                    importance: i //or i+1, Moiri seems to use 0
			                };
			                switch (precision) {
			                    case 0:
			                        landmarks.push(obj);
			                       	 break;
			                    case 1:
			                        if (bigger.indexOf(resource[i].subclass) != -1) {
			                            landmarks.push(obj);
			                        }
			                        break;
			                    case 2:
			                        if (important.indexOf(resource[i].subclass) != -1){
			                            landmarks.push(obj);
			                        }
			                        break;
			                    default :
			                        console.log('problem with precision');
			                }
			            }
			        }
			        if (all) nextfunction(landmarks);
			        else nextfunction([landmarks[0]]);
			    }
				}
		});
	},
	
	// given a latilong( lat, long), and precision, returns the "best" landmark from getLandmarks
	// just returns the first one now
	// Precision from 1 to 10, 1 - very precise
	getLandmark: function( map, destlong, precision, nextfunction) {
		placer.getLandmarks(map, destlong, precision, false, function( landmarks ) {
			nextfunction( landmarks[0] );
		});
	}


}