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
	var markers = [];
	var img_array = [
		{
	    	url: 'images/marker0.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(0, 32)
		},
		{
	    	url: 'images/marker1.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(0, 32)
		},	
		{
	    	url: 'images/marker2.png',
	    	size: new google.maps.Size(20, 32),
	    	origin: new google.maps.Point(0,0),
	    	anchor: new google.maps.Point(0, 32)
		}							
	];
	
	addMarker: function(location, importance, name) {
		marker = new google.maps.Marker({
			position: location,
			map: map,
			icon: img_array[importance],
			title: name
		});
		markers.push(marker);
	}

	clearOverlays: function() {
	  if (markers) {
		for (i in markers) {
		  markers[i].setMap(null);
		}
	  }
	}

	showOverlays: function() {
	  if (markers) {
		for (i in markers) {
		  markers[i].setMap(map);
		}
	  }
	}

	deleteOverlays: function() {
	  if (markers) {
		for (i in markers) {
		  markers[i].setMap(null);
		}
		markers.length = 0;
	  }
	}
	
	map: function(obj, landmarks) {
		var center = new google.maps.LatLng(37.7699298, -122.4469157);
		var mapOptions = {
	 		zoom: 12,
			center: center,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map =  new google.maps.Map(obj, mapOptions);
		for (lm in landmarks) {
			addMarker(lm.latlong, lm.importance, lm.name);
		}
	}
}
