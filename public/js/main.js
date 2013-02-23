var main = {
	init: function() {
		// var dest = {
		// 	name: "Bob Home",
		// 	latlong: {Latitude: 91384149, Longitude: 934245},
		// 	importance: 1 // very important
		// };
		// placer.getLandmarks( dest, 0, function( data, landmarks ) {
		// 	neighborhood = placer.getNeighborhood( data );
		// 	
		// 	console.log( dest.name + " in " + neighborhood );
		// 	
		// 	placer.map( domObj, landmarks );
		// });
        
		
		
				
		mapper.start( document.getElementById("map"), new google.maps.LatLng(24.4700, 54.38), 13 );		
		
		var defaultBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(20.4700, 56.38),
		  new google.maps.LatLng(30, 50));

		var input = document.getElementById('search-query');

		var searchBox = new google.maps.places.SearchBox(input, {
		  bounds: defaultBounds
		});
		
		searchBox.bindTo('bounds', mapper.map);
		
		// google.maps.event.addListener(searchBox, 'places_changed', function() {
		// 	var places = searchBox.getPlaces();
		// 
		// 	    for (var i = 0, marker; marker = markers[i]; i++) {
		// 	      marker.setMap(null);
		// 	    }
		// 
		// 	    markers = [];
		// 	    var bounds = new google.maps.LatLngBounds();
		// 	    for (var i = 0, place; place = places[i]; i++) {
		// 	      var image = {
		// 	        url: place.icon,
		// 	        size: new google.maps.Size(71, 71),
		// 	        origin: new google.maps.Point(0, 0),
		// 	        anchor: new google.maps.Point(17, 34),
		// 	        scaledSize: new google.maps.Size(25, 25)
		// 	      };
		// 
		// 	      var marker = new google.maps.Marker({
		// 	        map: map,
		// 	        icon: image,
		// 	        title: place.name,
		// 	        position: place.geometry.location
		// 	      });
		// 
		// 	      markers.push(marker);
		// 
		// 	      bounds.extend(place.geometry.location);
		// 	    }
		// 
		// 	    map.fitBounds(bounds);
		// 	  });
		
		if (navigator.geolocation) {
			$('.nav-current').click( function( ev) {
				navigator.geolocation.getCurrentPosition( function( position ) {
					console.log( position.coords.latitude + " Longitude: " + position.coords.longitude);
				});

				return false;
			});
		}
		else
		{
			$('.nav-current').hide();
		}
	}
}

$(document).ready( main.init );