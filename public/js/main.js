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
		
		main.smser();
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
		placer.getLandmark( mapper.map, location, 0, function( landmark ) {
			marker = mapper.addMarker( landmark.latlong, landmark.inmportance, landmark.name );
		
			if ( main.destination ) {
		    main.destination.setPosition(location);
		  } else {
		    main.destination = mapper.addMarker( location, 0, "Destination" );
				main.destination.setVisible(false);
			
				$('p', main.infobox).html('Sama Tower<br>Across from Etisalat Towers<br>Al Markaziyah');
			
				var infowindow = new google.maps.InfoWindow(
					{
						content: main.infobox.get(0),
						size: new google.maps.Size(50,50)
					}
				);

				infowindow.open(mapper.map, main.destination);
				google.maps.event.addListener(main.destination, 'click', function() {			
					infowindow.open(mapper.map, main.destination);
				})
			}
		
			// console.log( destinator.get( mapper.map, main.destination, marker ) );
			
			main.startNav();
		});
	},
	startNav: function() {
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );
		start = new google.maps.LatLng( 24.485079, 54.353435 );
		mapper.addMarker(start, 3, "Origin");
		director.getDirections( new google.maps.LatLng( 24.485079, 54.353435 ), main.destination.position );
	},
	selector: function() {
		google.maps.event.addListener(mapper.map, 'click', function(event) {			
			main.setDest(event.latLng, "Destination");
		})
	}
}

$(document).ready( main.init );