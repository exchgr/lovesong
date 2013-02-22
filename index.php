<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Landmarkr</title>
	
	<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" rel="stylesheet">
	<link rel="stylesheet" href="public/css/style.css" type="text/css" media="screen" title="Main Stype" charset="utf-8">
	
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false&key="></script>
	<script src="public/js/mapper.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
	<div class="navbar">
		<div class="navbar-inner">
			<div class="name pull-left">
				<a class="brand pull-left" href="#">Landmarkr</a>
			</div>
			<ul class="nav pull-right">
			  <li><a href="#">Use Current Location</a></li>
			</ul>
			<form class="navbar-search">
			  <input type="text" class="search-query" placeholder="Search for destination">
			</form>
		</div>
	</div>
	<div class="container">
		<div id="map"></div>
	</div>
</body>
</html>