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
            var listOfLandMarks = {};

						var returnedSteps = 0;
						function getLandMarks(step, expectedSteps){
                placer.getLandmarks(mapper.map, step['end_point'], 0, false,
                    function(landmarks){
											var landmark = landmarks[0];
											if (landmark) {
                        mapper.addMarker(landmark.latlong, landmark.importance, landmarks[0].name);
											  if (typeof listOfLandMarks[landmark['name']] == 'undefined'){
                        	var name = director.getName(step);
                          director.setName(step, name+'<span class="nearby">&mdash;near <b>'+ landmark['name']+'</b></span>');
                          listOfLandMarks[landmark['name']] = 1;
                       	}
												console.log('returned steps', returnedSteps, 'expected steps', expectedSteps)
									   	 }
											 if (++returnedSteps == expectedSteps) {
											 		director.display.setDirections(response);
											 }
                    }
                );
            }

            if (status == google.maps.DirectionsStatus.OK) {
                var tmp = response['routes'][0]['legs'][0]['steps'];
                for(var i = 0; i<tmp.length; i++){
                    getLandMarks(tmp[i], tmp.length);
                }

                setTimeout(function() {
                    
                },10000);

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