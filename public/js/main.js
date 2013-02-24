var main = {
	init: function() {
		
		var center = new google.maps.LatLng(24.485743,54.354086);
		mapper.start( document.getElementById("map"), center, 15 );	
		var infowindow;
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
					console.log( $('#myonoffswitch').val() );
					
                    var pos = new google.maps.LatLng( position.coords.latitude, position.coords.longitude);

                    if (!$('#myonoffswitch').is(':checked')){
                        main.setDest(pos, "Destination");
                    } else {


                        if(main.origin)main.origin.setPosition(pos);
                        else main.origin = mapper.addMarker(pos, 3, 'Origin');

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
					pos = new google.maps.LatLng(24.485743,54.354086);
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
					'message': 'Sama Tower, by Etisalat Towers, Al Markaziyah'
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
		
			$('p', main.infobox).html('Al Markaziyah');
		}
		
		if(!main.infowindow) {
			main.infowindow = new InfoBox({content:main.infobox.get(0)});
		}
		main.infowindow.open(mapper.map, main.destination);


		placer.getLandmark( mapper.map, location, 0, function( landmark ) {

			marker = mapper.addMarker( landmark.latlong, landmark.importance, landmark.name );
			
			$('p', main.infobox).html(destinator.get( mapper.map, { latlong: main.destination.position, name: 'Your destination' }, landmark ));
			
		});
		
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