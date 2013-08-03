$(document).ready( function() {
	_.templateSettings = {
	  interpolate : /\{\{(.+?)\}\}/g
	};
	
	console.log( 'app ready to go' );
	
	$('#prompt .content').html( _.template($('#template-hello').html(), {name: 'Bob'}) );
	
	
	$('#start').click( function() {
		$('#prompt').slideUp();
		$('#loading').slideDown();
		
		return false;
	});
});