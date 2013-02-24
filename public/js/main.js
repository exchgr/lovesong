var main = {
	init: function() {
		
		var center = new google.maps.LatLng(24.485743,54.354086);
		mapper.start( document.getElementById("map"), center, 15 );	
		
		var defaultBounds = new google.maps.LatLngBounds(center, new google.maps.LatLng(30, 50));
		var input = document.getElementById('search-query');
		var searchBox = new google.maps.places.Autocomplete(input, {
		  bounds: defaultBounds
		});
		searchBox.bindTo('bounds', mapper.map);

		
		google.maps.event.addListener(searchBox, 'place_changed', function() {
			main.setDest(searchBox.getPlaces()[0].geometry.location, "test")
		}),
		main.enterMode( 'dest' );
		
		if (navigator.geolocation) {
			$('.nav-current').click( function(ev) {
				navigator.geolocation.getCurrentPosition( function( position ) {
					main.origin.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
					$('#myonoffswitch').prop('checked', false);
					if (main.destination) main.startNav();
					else main.enterMode( 'dest' );
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
			google.maps.event.addListener(mapper.map, 'click', function(event) {			
				main.setDest(event.latLng, "Destination");
			});
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
		
		var infowindow = new InfoBox({content:main.infobox.get(0)});
		infowindow.open(mapper.map, main.destination);
		google.maps.event.addListener(main.destination, 'click', function() {			
			infowindow.open(mapper.map, main.destination);
		});

		placer.getLandmark( mapper.map, location, 0, function( landmark ) {

			marker = mapper.addMarker( landmark.latlong, landmark.importantce, landmark.name );
									
			$('p', main.infobox).html(destinator.get( mapper.map, { latlong: main.destination.position, name: 'Your destination' }, landmark ));
			
		});
		
		main.enterMode( 'origin' );
		
		if( main.origin ) {
			main.startNav();
		}
	},
	
	startNav: function() {
		mapper.clearOverlays();
		mapper.deleteOverlays();
		
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );

		director.getDirections( main.origin.position, main.destination.position );
	},
}

$(document).ready( main.init );