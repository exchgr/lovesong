// Landmark object
// 
// Properties:
//	* name
//	* latlong (lat, long)
// 	* importance
//	* color

var placer = {
	
	// given a latlong (lat, long)
	// returns a neighborhood
	getNeighborhood: function( latlong ) {
		return "Al Fujarah";
	}
	
	// given a latlong( lat, long), and precision
	// 	precision: 0 (low - general vicinity) or 1 (high - for directions)
	// returns an array of landmark objects — ranked by "landmarkiness" and "proximity"
	getLandmarks: function( latlong, precision ) {
		
	}
	
	// given a latilong( lat, long), and precision, returns the "best" landmark from getLandmarks
	getLandmark: function( lat, long, precision ) {
		
	}
}