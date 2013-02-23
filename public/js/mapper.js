// This class is responsible for mapping everything

var markers = [];
var img_array = [
		{
	    	url: 'public/images/marker0.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(10, 32)
		},
		{
	    	url: 'public/images/marker1.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(10, 32)
		},	
		{
	    	url: 'public/images/marker2.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(10, 32)
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
		  markers[i].setMap(null);
		}
	},
	
	showOverlays: function() {
		for (var i in markers) {
		  markers[i].setMap(map);
		}
	},
	
	deleteOverlays: function() {
	  if (markers) {
		for (i in markers) {
		  markers[i].setMap(null);
		}
		markers.length = 0;
	  }
	},
	
	addLandmarks: function( landmarks ) {
		for (i in landmarks) {
			var lm = landmarks[i];
			console.log( lm );
			mapper.addMarker(lm.latlong, 1, lm.name);
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
