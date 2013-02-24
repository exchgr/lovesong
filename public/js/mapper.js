// This class is responsible for mapping everything

var markers = [];
var img_array = [
		{
	    	url: 'images/marker0.png',
	    	size: new google.maps.Size(32, 37),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(15, 37)
		},
		{
	    	url: 'images/marker1.png',
	    	size: new google.maps.Size(32, 37),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(15, 37)
		},
		{
	    	url: 'images/marker1.png',
	    	size: new google.maps.Size(32, 37),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(10, 37)
		},
		{
	    	url: 'images/marker_start.png',
	    	size: new google.maps.Size(20, 34),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(10, 34)
		},
		{
	    	url: 'images/marker_end.png',
	    	size: new google.maps.Size(20, 34),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(10, 34)
		}
	];

var mapper = {

	addMarker: function(location, importance, name) {		
		marker = new google.maps.Marker({
			position: location,
			icon: img_array[importance],
			map: mapper.map,
			title: name
		});
		markers.push(marker);
		return marker;
	},
	
	clearOverlays: function() {
		for (var i in markers) {
		  if (markers[i].title != "Destination" && markers[i].title != "Origin") markers[i].setMap(null);
		}
	},
	
	showOverlays: function() {
		for (var i in markers) {
		  markers[i].setMap(map);
		}
	},
	
	//don't delete the function
	deleteOverlays: function() {
	  if (markers) {
		for (i in markers) {
		  if (markers[i].title != "Destination" && markers[i].title != "Origin") markers[i].setMap(null);
		}
		markers.length = 2;
	  }
	},
	
	addLandmarks: function( landmarks ) {
		for (i in landmarks) {
			var lm = landmarks[i];
			//console.log( lm );
			mapper.addMarker(lm.latlong, lm.importance, lm.name);
		}
	},
	
	// given a DOM Object, destination bject, and an array of landmark objects
	// inserts a map with the destination and landmark pins to that DOM
	start: function(obj, center, zoom) {
		var mapOptions = {
			zoom: zoom,
			center: center,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		mapper.map = new google.maps.Map(obj, mapOptions);
	}
};
