var main = {
	init: function() {
		var dest = {
			name: "Bob Home",
			latlong: {Latitude: 91384149, Longitude: 934245},
			importance: 1 // very important
		};
		placer.getLandmarks( dest, 0, function( data, landmarks ) {
			neighborhood = placer.getNeighborhood( data );
			
			console.log( dest.name + " in " + neighborhood );
			
			placer.map( domObj, landmarks );
		});
	},
	getCurrent: function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		}
	}
}