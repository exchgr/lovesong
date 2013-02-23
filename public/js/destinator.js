var destinator = {

	get:function (map, dest, land) {
	
		destPos = dest.latlong;
		landPos= land.latlong;
	
		var geometry = google.maps.geometry.spherical;
		var distance = Math.round(geometry.computeDistanceBetween(destPos, landPos));
		
		var result = '';
		
		if (dest.name) result += dest.name;
		else result += 'Unknown location';
		
		result = result + ' is ' + distance.toString() + ' metres ';
		
		var angle = geometry.computeHeading(landPos,destPos);
		
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
		
		return(result);
	}
	

}