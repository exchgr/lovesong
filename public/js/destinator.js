var destinator = {

	get:function (map, dest, land, nextfaction) {
	
<<<<<<< HEAD
	
		var service = new google.maps.places.PlacesService(map);
=======
		desPos = dest.position;
	
>>>>>>> d95aa6b595caf64bf3bc97e6c4ac9244d5a564b4
		var geometry = google.maps.geometry.spherical;
		// var distance = Math.round(geometry.computeDistanceBetween(desPos, ));
		
		var result = '';
		
		if (dest.name) result += dest.name;
		else result += 'Unknown location';
		
		if (distance > 700) {
		distance /= 1000;
		result = result + ' is ' + distance.toString() + ' km ';}
		else result = result + ' is ' + distance.toString() + ' m ';
		
		var angle = geometry.computeHeading(land.location,dest.location);
		
		if (angle >= 168.75) result += 'S';
		else if (angle >= 123.75) result += 'SE';
		else if (angle >= 78.75) result += 'E';
		else if (angle >= 33.75) result += 'NE';
		else if (angle <= 191.25-360) result += 'S';
		else if (angle <= 213.75-360) result += 'SW';
		else if (angle <= 258.75-360) result += 'W';
		else if (angle <= 303.75-360) result += 'NW';
		else if (angle <= 348.75-360) result += 'N';
		else result += 'N';
		
		result = result + ' of ' + land.name;
		
		console.log(result);
		//return(result);
	
		
	
	}
	

}