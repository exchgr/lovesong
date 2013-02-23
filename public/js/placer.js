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
	
	// given landmark, and precision
	// 	precision: 0 (very close, any type), 1 (close, bigger landmark), or 2 (important landmark)
	// passes an array of landmark objects — ranked by "landmarkiness" and "proximity"
	
	//nextfunction - pass the name of the function that handles landmarks further
	getLandmarks: function(map, dest, precision, all, nextfunction) {
		$.ajax({

			method: 'GET',
			dataType: 'json',
			data: {
				'user_id':'TEST_USER',
				'api_key':'EXAMPLE_KEY_3edaba1953abf86',
				'count':20, //play with the value
				'lat':dest.lat(),
				'lon':dest.lng()
				},
<<<<<<< HEAD
			 // url: '/landmarkr/public/js/1.json',
		    url: 'json',
=======
			 url: 'public/js/1.json',
		    //url: 'json',
>>>>>>> 6ca241e5cc0a97e8fabfe5e73851839c6f9f1b61
		    success: function(data, status){
					var status = 200;
			    if (status == 200) {
			        var resource = data.landmarks;
							console.log( data );
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
			// console.log( landmarks );
			nextfunction( landmarks[0] );
		});
	}


}