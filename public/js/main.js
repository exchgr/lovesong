$(document).ready( function() {
	console.log( 'app ready to go' );
	
	$('#start').click( function() {
		$('#prompt').slideUp();
		$('#loading').slideDown();
		
		return false;
	});
});