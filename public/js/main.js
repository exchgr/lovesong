var main = {
	init: function() {
		// var dest = {
		// 	name: "Bob Home",
		// 	latlong: {Latitude: 91384149, Longitude: 934245},
		// 	importance: 1 // very important
		// };
		// placer.getLandmarks( dest, 0, function( data, landmarks ) {
		// 	neighborhood = placer.getNeighborhood( data );
		// 	
		// 	console.log( dest.name + " in " + neighborhood );
		// 	
		// 	placer.map( domObj, landmarks );
		// });
		
		mapper.start( document.getElementById("map") );
		
		// if (navigator.geolocation) {
		// 			$('.nav-current').click( function( ev) {
		// 				navigator.geolocation.getCurrentPosition( function( position ) {
		// 					console.log( position.coords.latitude + " Longitude: " + position.coords.longitude);
		// 				});
		// 
		// 				return false;
		// 			});
		// 		}
		// 		else
		// 		{
		// 			$('.nav-current').hide();
		// 		}
	}
}

$(document).ready( main.init );