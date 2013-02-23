// This class is responsible for getting directions

var director = {
	init: function() {
		director.service = new google.maps.DirectionsService();
		director.display = new google.maps.DirectionsRenderer(
		{
			preserveViewport: true,
		});
    director.display.setMap(mapper.map);
    director.display.setPanel(document.getElementById('panel'));
	},
	
	getDirections: function( start, finish ) {
		var request = {
        origin:         start,
        destination:    finish,
        travelMode:     google.maps.DirectionsTravelMode.DRIVING
		};

		return director.service.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {	
				director.display.setDirections(response);
				var markerLatLngs = response['routes'][0]['overview_path'];
				//mapper.addMarker(markerLatLngs[0], 1, "som");
			}
		});
	}
}