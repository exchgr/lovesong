var placer = {
	
	// given a large thing
	// returns a neighborhood
	getNeighborhood: function( latlong ) {
		return "Al Fujarah";
	}
	
	// given landmark, and precision
	// 	precision: 0 (low - general vicinity), 1 (high - for directions), o 2 (high -for very large one)
	// passes an array of landmark objects — ranked by "landmarkiness" and "proximity"
	getLandmarks: function( dest, precision, callback ) {
		var landmarks = [
			{
				name: "Bob Location",
				latlong: {3943020, 3203203},
				importance: 1 // very important
			},
			{
				name: "Bob Samson",
				latlong: [3943020, 3203203],
				importance: 2 // less so
			}
		];
		
		callback( data, landmarks );
	}
	
	// given a latilong( lat, long), and precision, returns the "best" landmark from getLandmarks
	getLandmark: function( lat, long, precision ) {
		
	}
}