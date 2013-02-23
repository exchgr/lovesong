// This class is responsible for getting directions

var director = {
	init: function() {
		director.service = new google.maps.DirectionsService();
		director.display = new google.maps.DirectionsRenderer(
		{
			preserveViewport: true,
			suppressMarkers: true
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
                var name = director.getName(response, 2);
                console.log(name);
                response = director.setName(response, 2, 'Hello');

				director.display.setDirections(response);
				var markerLatLngs = response['routes'][0]['overview_path'];
				//mapper.addMarker(markerLatLngs[0], 1, "som");
			}
		});
	},

    getName: function(response, position){
        return response['routes'][0]['legs'][0]['steps'][position]['instructions'];
    },

    setName: function(response, position, name){
        response['routes'][0]['legs'][0]['steps'][position]['instructions'] = name;
        return response;
    }
}

