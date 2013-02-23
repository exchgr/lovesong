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
		
		var center = new google.maps.LatLng(24.485743,54.354086);
		
		mapper.start( document.getElementById("map"), center, 15 );		
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
			$('.nav-current').click( function(ev) {
				navigator.geolocation.getCurrentPosition( function( position ) {
					main.origin.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
					if (main.destination) main.startNav();
				});

				return false;
			});
		}
		else
		{
			$('.nav-current').hide();
		}
		
		director.init();
		
		$('#myonoffswitch').change(function() {
			console.log( $(this).val() );
		});


$(input).keypress(function(e) {
if (e.which == 13){
			if($(input).val()=='SPQR'){
					main.origin.setPosition(new google.maps.LatLng(24.485743,54.354086));
				main.startNav();
				}
		}
	});

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
	},
	enterMode: function( mode ) {
		google.maps.event.clearListeners(mapper.map, 'click');
		
		if( mode == 'dest' )
		{
			$('#myonoffswitch').prop('checked', false);
			main.selector();
		}
		else
		{
			$('#myonoffswitch').prop('checked', true);
			
			google.maps.event.addListener(mapper.map, 'click', function(event) {
				if (main.origin){
					main.origin.setPosition(event.latLng);
				} else {
					main.origin = mapper.addMarker(event.latLng, 3, 'Origin');
				}
				main.startNav();
				main.enterMode( 'dest' );
			});
		}
	},
	setDest: function( location, info ) {
		if ( main.destination ) {
	    main.destination.setPosition(location);
	  } else {
	    main.destination = mapper.addMarker( location, 4, "Destination" );
			// main.destination.setVisible(false);
		
			$('p', main.infobox).html('Al Markaziyah');
		}
		
		var infobox = new InfoBox(
			{
				content: main.infobox.get(0),
				size: new google.maps.Size(50,50)
			}
		);
		infobox.open(mapper.map, main.destination);
		google.maps.event.addListener(main.destination, 'click', function() {			
			infobox.open(mapper.map, main.destination);
		});

		placer.getLandmark( mapper.map, location, 0, function( landmark ) {

			marker = mapper.addMarker( landmark.latlong, landmark.importantce, landmark.name );
									
			$('p', main.infobox).html(destinator.get( mapper.map, { latlong: main.destination.position, name: 'Your destination' }, landmark ));
			
		});
		
		main.setOrigin( "arbitrary" );
		
		if( main.origin ) {
			main.startNav();
		}
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
			main.enterMode( 'origin' );
		}
	},
	startNav: function() {
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );

		director.getDirections( main.origin.position, main.destination.position );
	},
	selector: function() {
		google.maps.event.addListener(mapper.map, 'click', function(event) {			
			main.setDest(event.latLng, "Destination");
		})
	}
}


$(document).ready( main.init );