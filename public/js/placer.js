//DOING EXACTLY WHAT THE FUNCTIONS ASK
	
//take the map and the service definitions out, when connecting to Moiri's maps.Map!

var placer = {

	// given a large thing
	// returns a neighborhood
	getNeighborhood: function(latlong, nextfunction) {
		
		var center = new google.maps.LatLng(latlong[0],latlong[1]);
		
		var service = new google.maps.places.PlacesService(map);

	
		var request = {
			radius:50000, //just to make sure
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
						i++;
						return false;
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
	getLandmarks: function(dest, precision, nextfunction) {
	
		var landmarks = [];
	
		$(document).ready(function() {
			$.ajax({
				method: 'GET',
				dataType: 'json',
				/*data: {
					'user_id':'TEST_USER',
					'api_key':'EXAMPLE_KEY_3edaba1953abf86',
					'count':20, //play with the value
					'lat':dest[0],
					'lon':dest[1]
					},
					*/
				url: '1.json',
				async: false,
				//url: 'http://api.geckolandmarks.com/json',
			success: function(data, status) {
			//processing
				alert('ads');
				if (status == 200) {
					
					var resource = data[1];
					
					for (var i = 0; i < resource.length; i++) {
						switch (precision) {
							case 0:
								landmarks.push({
								name:resource[i].name,
								latlong: center,
								importance: i //or i+1, Moiri seems to use 0
								})	
							break;
							case 1:
								if (bigger.indexOf(resource[i].subclass) != -1) {
									landmarks.push({
									name:resource[i].name,
									latlong: center,
									importance: i //or i+1, Moiri seems to use 0
									})
									}
							break;
							case 2:
								if (important.indexOf(resource[i].subclass) != -1){
									landmarks.push({
									name:resource[i].name,
									latlong: center,
									importance: i //or i+1, Moiri seems to use 0
									})	
									}
							break;
						}
					
					}
					
					nextfunction(landmarks);
				}
			
			}
			});
			
	});
	},
	
	// given a latilong( lat, long), and precision, returns the "best" landmark from getLandmarks
	// just returns the first one now
	// Precision from 1 to 10, 1 - very precise
	getLandmark: function( destlong, precision, nextfunction ) {
		getLandmarks(destlong, precision, nextfunction);
	}
}