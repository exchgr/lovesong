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
		
		var center = new google.maps.LatLng(24.4700, 54.38);
		mapper.start( document.getElementById("map"), center, 13 );		
		placer.getLandmarks(mapper.map, center, 1, mapper.addLandmarks, true);
		var defaultBounds = new google.maps.LatLngBounds(center, new google.maps.LatLng(30, 50));

		var input = document.getElementById('search-query');

		var searchBox = new google.maps.places.SearchBox(input, {
		  bounds: defaultBounds
		});
		
		searchBox.bindTo('bounds', mapper.map);
		//console.log(searchBox);
		google.maps.event.addListener(searchBox, 'places_changed', function() {
			main.setDest(searchBox.getPlaces()[0].geometry.location, "test"),
			main.startNav()
		}),
		main.selector();
		
		if (navigator.geolocation) {
			$('.nav-current').click( function( ev) {
				navigator.geolocation.getCurrentPosition( function( position ) {
					//console.log( position.coords.latitude + " Longitude: " + position.coords.longitude);
				});

				return false;
			});
		}
		else
		{
			$('.nav-current').hide();
		}
		
		director.init();
	},
	smser: function() {
		
	},
	setDest: function( location, info ) {
		placer.getLandmark( mapper.map, location, 0, function( landmark ) {
			mapper.addMarker( landmark.latlong, landmark.inmportance, landmark.name );
		} );
		console.log(main.destination);
		if ( !main.destination ) {
			main.destination = location;
			console.log("first");
			var infowindow = new google.maps.InfoWindow(
				{
					content: "TEST",//'<p>Sama Tower<br>Across from Etisalat Towers<br>Al Markaziyah</p><p class="sms"><label for="sms">Send to</label><input type="text" id="sms" name="sms" placeholder="SMS"></p>',
					size: new google.maps.Size(50,50),
					position: main.destination
				}
			);
			infowindow.open(mapper.map);
		} else {
			main.destination = location;
			infowindow.setPosition(location);
		}
	},
	startNav: function() {
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );
		director.getDirections( new google.maps.LatLng( 24.485079, 54.353435 ), main.destination );
	},
	selector: function() {
		google.maps.event.addListener(mapper.map, 'click', function(event) {			
			main.setDest(event.latLng, "Destination"),
			main.startNav()
		})
	}
}

$(document).ready( main.init );