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
			function getLandMarks(step){
                placer.getLandmarks(mapper.map, step['end_point'], 0, false,
                    function(landmarks){
                        mapper.addMarker(landmarks[0].latlong, landmarks[0].importance, landmarks[0].name);

//                        console.log(landmarks[0]);
//                        console.log(i);

                        var name = director.getName(step);
                        director.setName(step, name+' You will see '+ landmarks[0]['name']+' nearby');
                    }
                );
            }

            if (status == google.maps.DirectionsStatus.OK) {
                var tmp = response['routes'][0]['legs'][0]['steps'];
                for(var i = 0; i<tmp.length; i++){
                    getLandMarks(tmp[i]);
                }

                setTimeout(function() {
                    director.display.setDirections(response);
                },1000);

				var markerLatLngs = response['routes'][0]['overview_path'];
				//mapper.addMarker(markerLatLngs[0], 1, "som");
			}
		});
	},

    getName: function(step){
        return step['instructions'];
    },

    setName: function(step, name){
        step['instructions'] = name;
    }
}