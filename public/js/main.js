var main = {
	init: function() {
		
		main.i = 0;
		
		var center = new google.maps.LatLng(24.485743,54.354086);
		mapper.start( document.getElementById("map"), center, 15 );	
		
		var defaultBounds = new google.maps.LatLngBounds(center, new google.maps.LatLng(30, 50));
		var input = document.getElementById('search-query');
		var sbService = new google.maps.places.AutocompleteService();
		var searchBox = new google.maps.places.Autocomplete(input, {
		  bounds: defaultBounds
		});

		searchBox.bindTo('bounds', mapper.map);
		main.enterMode( 'dest' );
		
		if (navigator.geolocation) {
			$('.nav-current').click( function(ev) {
				navigator.geolocation.getCurrentPosition( function( position ) {

			  var pos = new google.maps.LatLng( position.coords.latitude, position.coords.longitude);

			  if (!$('#myonoffswitch').is(':checked')){
			      main.setDest(pos, "Destination");
			  } else {


			      if(main.origin)main.origin.setPosition(pos);
			      else main.origin = mapper.addMarker(pos, 4, 'Origin');

			      main.startNav();

			      main.enterMode('dest');
					}
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
			if ($('#myonoffswitch').is(':checked')) main.enterMode('origin');
			else main.enterMode('dest');
			$('#search-query').val('');
		});


		$(input).keypress(function(e) {
			if (e.which == 13){
				//console.log($(input).val());
				if($(input).val()=='SPQR'){
					pos = new google.maps.LatLng(24.494334531633775,54.3623685836792); // 24.494334531633775, lon: 54.3623685836792
					// Your destination is 234 metres W of Al Falah Plaza
					if ($('#myonoffswitch').is(':checked')==false){
						main.setDest(pos)
					} else {
						if(main.origin)main.origin.setPosition(pos);
						else main.origin = mapper.addMarker(pos, 3, 'Origin');
						main.enterMode('dest');
					}
					if(main.destination && main.origin) main.startNav();
				}
				else{
					//console.log(searchBox.getPlace());
					sbService.getPlacePredictions({input:$(input).val()}, function(predictions) {
						var address = predictions[0].description;
						
						var geo = new google.maps.Geocoder;
						geo.geocode({'address':address},function(results, status){
							  if (status == google.maps.GeocoderStatus.OK) {
								var pos = results[0].geometry.location;
								console.log($('#myonoffswitch').val());
								if ($('#myonoffswitch').is(':checked')==false){
									main.setDest(pos)
								} else {
									if(main.origin)main.origin.setPosition(pos);
									else main.origin = mapper.addMarker(pos, 3, 'Origin');
									main.enterMode('dest');
								}
								if(main.destination && main.origin) main.startNav();
							  } else {
								console.log("Geocode was not successful for the following reason: " + status);
							  }

						});
						
					});
				}
			}
		});
		$('#clearAll').click(function(){
			mapper.deleteAllMarkers();
		})
		main.smser();
	},
	
	smser: function() {
		this.infobox = $('<div>');
		
		// this.infobox.popover({content: 'sam'});
				
		this.infobox.append('<p class="location">Smith</p>');
		
		this.infobox.append('<p class="directions"><a href="#directions">Get directions to here</a></p>');
		
		$('p.directions a', this.infobox).click( function( ev ) {
			main.enterMode('origin');
			$('#search-query').val('');
			return false;
		});
		
		this.infobox.append('<form id="sms">');
		form = $('form', this.infobox)
		
		form.append('<label for="sms">Send to:</label>');
		form.append('<input type="text" id="sms" name="sms" placeholder="SMS">');
		
		this.infobox.append( '<p class="code">STAD</p>' );
		
		form.submit( function( ev ) {
			to = $('input', this).val();
			
			$.ajax({
				method: 'GET',
				dataType: 'json',
				data: {
					'to': to,
					'message': 'Sama Tower is by NMC Hospital, across from Etisalat Headquaters Building A'
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
			$('#search-query').attr("placeholder", "Select Destination");
			google.maps.event.addListener(mapper.map, 'click', function(event) {			
				main.setDest(event.latLng, "Destination");
			});
		}
		else
		{
			$('#myonoffswitch').prop('checked', true);
			$('#search-query').attr("placeholder", "Select Origin");
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
		
			$('p.location', main.infobox).html('Al Markaziyah');
		}
		
		var infowindow = new InfoBox({content:main.infobox.get(0)});
		infowindow.open(mapper.map, main.destination);
		google.maps.event.addListener(main.destination, 'click', function() {			
			infowindow.open(mapper.map, main.destination);
		});
		
		if( main.i < 3 ) {
			if( main.i == 0 ) {
				$('p.location', main.infobox).html('<strong class="destination">Sama Tower</strong> is by <strong class="landmark">NMC Hospital</strong>, across from <strong>Etisalat Headquaters Building A</strong>.');

				landmark = {
					latlong: new google.maps.LatLng( 24.484062194824219, 54.359064102172852),
					importance: 2,
					name: "Etisalat Headquaters Building A"
				}
				marker = mapper.addMarker( landmark.latlong, landmark.importance, landmark.name );	
			}
			else if( main.i == 1 ) {
				$('p.location', main.infobox).html('<strong class="destination">Your destination</strong> is <strong class="distance">127 metres NE</strong> of <strong class="landmark">Hilton Corniche Hotel</a>.');
				$('p.code', main.infobox).html('SPQR');

				landmark = {
					latlong: new google.maps.LatLng( 24.493632316589355, 54.361381530761719),
					importance: 2,
					name: "Hilton Corniche Hotel"
				}
				marker = mapper.addMarker( landmark.latlong, landmark.importance, landmark.name );
			}
		}
		// 24.486914231203183, lon: 54.36957836151123
		else
		{
			placer.getLandmark( mapper.map, location, 0, function( landmark ) {

				marker = mapper.addMarker( landmark.latlong, landmark.importantce, landmark.name );

				$('p.location', main.infobox).html(destinator.get( mapper.map, { latlong: main.destination.position, name: 'Your destination' }, landmark ));

			});
		}
		
		main.i++;
		
		//main.enterMode( 'origin' );
		
		if( main.origin ) {
			main.startNav();
		}
	},
	
	startNav: function() {
		mapper.deleteLmMarkers();
		
		$('#panel').show().animate( {width: '20%'} );
		$('#map').animate( {width: '80%'} );

		director.getDirections( main.origin.position, main.destination.position );
	},
}

function getLatLong(address){
      var geo = new google.maps.Geocoder;
      geo.geocode({'address':address},function(results, status){
              if (status == google.maps.GeocoderStatus.OK) {
								console.log(results[0].geometry.location);
                return results[0].geometry.location;
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }

       });

  }


$(document).ready( main.init );