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
		// placer.getLandmarks(mapper.map, center, 1, true, mapper.addLandmarks);
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

		main.origin = mapper.addMarker( center, 4, "origin" );

		main.smser();
		//start = new google.maps.LatLng( 24.485079, 54.353435 );
		//main.origin = mapper.addMarker(start, 3, "Origin");
	},
	smser: function() {
		this.infobox = $('<div>');
		
		this.infobox.append('<p>Smith</p>');
		
		this.infobox.append('<form id="sms">');
		form = $('form', this.infobox)
		
		form.append('<label for="sms">Send to:</label>');
		form.append('<input type="text" id="sms" name="sms" placeholder="SMS">');
				
		form.submit( function( ev ) {
			to = $('input', this).val();
			
			$.ajax({
				method: 'GET',
				dataType: 'json',
				data: {
					'to': to,
					'message': 'Sama Tower, Across from Etisalat Towers, Al Markaziyah'
					},
				//url: '/landmarkr/public/js/1.json',
			    url: '/sms',
			    success: function(data, status){
						console.log( $('#sms').val() );
						var status = 200;
				    if (status == 200) {
				        console.log( status );
				    }
					}
			});
			return false;
		});
		
		// $('form', this.infobox).submit( function( ev ) {
		// 	console.log( 'sick' );
		// 	console.log( this );
		// });
				
		// console.log( this.infobox );
		
		// $('sms').submit( function() )
	},
	setDest: function( location, info ) {
		if ( main.destination ) {
	    main.destination.setPosition(location);
	  } else {
	    main.destination = mapper.addMarker( location, 4, "Destination" );
			// main.destination.setVisible(false);
		
			$('p', main.infobox).html('Al Markaziyah');
		}
		
		var infowindow = new google.maps.InfoWindow(
			{
				content: main.infobox.get(0),
				size: new google.maps.Size(50,50)
			}
		);
		
		infowindow.open(mapper.map, main.destination);
		google.maps.event.addListener(main.destination, 'click', function() {			
			infowindow.open(mapper.map, main.destination);
		});
		
		main.startNav();
		
		placer.getLandmark( mapper.map, location, 0, function( landmark ) {
			marker = mapper.addMarker( landmark.latlong, landmark.importantce, landmark.name );
						
			mapper.addMarker( landmark.latlong, landmark.importance, landmark.name );
			
		});
	},
	startNav: function() {
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );

		director.getDirections( main.origin.position, main.destination.position );
	},
	setOrigin: function(type){

		if (type=="current") {
			;
		} else if (type=="nearest") {
			placer.getLandmark( mapper.map, location, 0, function( landmark ) {
				main.origin = mapper.addMarker( landmark.latlong, 3, landmark.name );
			} );
			main.startNav();
		} else if (type=="arbitrary") {
			google.maps.event.clearListeners(mapper.map, 'click');
			google.maps.event.addListener(mapper.map, 'click', function(event) {
				if (main.origin){
					main.origin.setPosition(event.latLng);
				} else {
					main.origin = mapper.addMarker(event.latLng, 3, 'Origin');
				}
				main.startNav();
				google.maps.event.clearListeners(mapper.map, 'click');
				main.selector();
			});
		}
	},
	selector: function() {
		google.maps.event.addListener(mapper.map, 'click', function(event) {			
			main.setDest(event.latLng, "Destination");
		})
	}
}

// 
// placer.getLandmarks(mapper.map, new google.maps.LatLng(24.4700, 54.38), 0, true, emptyFunct);
// 
// function emptyFunct(i){
//     console.log(i);
// }

$(document).ready( main.init );