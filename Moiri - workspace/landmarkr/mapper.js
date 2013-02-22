var landmarks = [
	{
		name: "landmark1",
		latlong: new google.maps.LatLng(37.77, -122.44),
		importance: 1,
	},
	{
		name: "landmark2",
		latlong: new google.maps.LatLng(37.78, -122.45),
		importance: 0,
	};
];

var mapper = {
	// given a DOM Object, destination bject, and an array of landmark objects
	// inserts a map with the destination and landmark pins to that DOM
	var map;
	var img_array = [
		var img_endpnts = {
	    	url: 'images/endpnts.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(0, 32)
		},
		var img_lm1 = {
	    	url: 'images/lm1.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(0, 32)
		},	
		var img_lm2 = {
	    	url: 'images/lm2.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(0, 32)
		};							
	];
	
	addMarker: function(name, location, importance) {
		
	};
	
	map: function( obj, landmarks ) {
		var center = new google.maps.LatLng(37.7699298, -122.4469157);
		var mapOptions = {
	 		zoom: 12,
			center: center,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map =  new google.maps.Map(obj, mapOptions);
	}
}