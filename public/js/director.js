// This class is responsible for getting directions

var director = {
	init: function() {
		director.service = new google.maps.DirectionsService();
    director.display = new google.maps.DirectionsRenderer();

    director.display.setMap(mapper.map);
    director.display.setPanel(document.getElementById('panel'));
	},
	// given a start latlong( lat, long) and an end latlong( lat, long)
	// returns the landmark-based directions
	getDirections: function( start, finish ) {
		console.log( start );
		var request = {
        origin:         start.hb + ',' + start.ib,
        destination:    finish.hb + ',' + finish.ib,
        travelMode:     google.maps.DirectionsTravelMode.DRIVING
    };

    return director.service.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {	
            director.display.setDirections(response);
            var tmp = response['routes'][0]['overview_path'];
            var arr = [];
            for (var i = 0; i< tmp.length; i++){
                arr.push({
                    lat : tmp[i]['hb'],
                    lng : tmp[i]['ib']
                });
            }

            // shuffle(arr);

						mapper.addMarker( new google.maps.LatLng(arr[0]['lat'], arr[0]['lng']), 1, "som");
            // mapper.addMarker(arr[0]['lat'], arr[0]['lng'])
            // mapper.addMarker(arr[1]['lat'], arr[1]['lng'])


        }
    });
	}
}