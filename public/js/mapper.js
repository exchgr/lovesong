// This class is responsible for mapping everything

// var landmarks = [
// 	{
// 		name: "landmark1",
// 		latlong: new google.maps.LatLng(37.77, -122.45),
// 		importance: 1
// 	},
// 	{
// 		name: "landmark2",
// 		latlong: new google.maps.LatLng(37.76, -122.44),
// 		importance: 0
// 	}
// ];

// var map;
// var markers = [];
// var img_array = [
// 		{
// 	    	url: 'images/marker0.png',
// 	    	size: new google.maps.Size(20, 32),
// 	    	origin: new google.maps.Point(0,0),
// 	    	anchor: new google.maps.Point(10, 32)
// 		},
// 		{
// 	    	url: 'images/marker1.png',
// 	    	size: new google.maps.Size(20, 32),
// 	    	origin: new google.maps.Point(0,0),
// 	    	anchor: new google.maps.Point(10, 32)
// 		},	
// 		{
// 	    	url: 'images/marker2.png',
// 	    	size: new google.maps.Size(20, 32),
// 	    	origin: new google.maps.Point(0,0),
// 	    	anchor: new google.maps.Point(10, 32)
// 		}							
// 	];

var mapper = {
	
	
	// addMarker: function(location, importance, name) {
	// 	marker = new google.maps.Marker({
	// 		position: location,
	// 		icon: img_array[importance],
	// 		map: map,
	// 		title: name
	// 	});
	// 	markers.push(marker);
	// },
	// 
	// clearOverlays: function() {
	//   if (markers) {
	// 	for (i in markers) {
	// 	  markers[i].setMap(null);
	// 	}
	//   }
	// },
	// 
	// showOverlays: function() {
	//   if (markers) {
	// 	for (i in markers) {
	// 	  markers[i].setMap(map);
	// 	}
	//   }
	// },
	// 
	// deleteOverlays: function() {
	//   if (markers) {
	// 	for (i in markers) {
	// 	  markers[i].setMap(null);
	// 	}
	// 	markers.length = 0;
	//   }
	// },
	
	addLandmarks: function( landmarks ) {
		
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
		
		// for (i in landmarks) {
		// 	var lm = landmarks[i];
		// 	mapper.addMarker(lm.latlong, lm.importance, lm.name);
		// }
		
		// return mapper.map;
	}
};
