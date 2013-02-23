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
                var tmp = response['routes'][0]['legs'][0]['steps'];
                for(var i = 0; i<tmp.length; i++){
                    placer.getLandmarks(mapper.map, new google.maps.LatLng(tmp[i]['end_point']['hb'], tmp[i]['end_point']['ib']), 0, false,
                        function(o){
                            console.log(o);
                            console.log(i);

                            console.log('HERE IS A PROBLEM WITH A CLOSURES. I is always staying the same. Closure should be used.');

//                            var name = director.getName(response, 2);
//                            response = director.setName(response, 2, name+' You will see '+o[0]['name']+' nearby');
                        }
                    );


                }

                setTimeout(function() {
                    director.display.setDirections(response);
                },1000);

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