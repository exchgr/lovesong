var main = {
	bookTemplate: _.template('<li class="media book"><a class="pull-left" href="<%= permalink_url %>"><img width="120" class="media-object" src="<%= cover_url %>"></a><div class="media-body"><h4 class="media-heading"><%= title %></h4><h5 class="author"><%= author %></h5><p><%= story %></p><p class="stats"><span class="badge"><%= reading %></span> reading | <span class="badge"><%= finished %></span> finished | <span class="badge"><%= interesting %></span> interesting | <span class="badge"><%= abandoned %></span> abandoned<div class="readers"><% _.each(readers, function(reader) { %><div class="media reader"><a href="<%= reader.permalink_url %>" class="pull-left"><img width="50" class="media-object" src="<%= reader.avatar_url %>" /></a><div class="media-body"><a href="<%= reader.permalink_url %>"><%= reader.fullname %></a></div></div> <% }); %></div></div></li>'),
	hiLite: _.template('<li class="media highlight"><a class="pull-left" href="<%= user.permalink_url %>"><img width="50" class="media-object" src="<%= user.avatar_url %>"></a><div class="media-body"><p><a href="<%= user.permalink_url %>"><%= user.fullname %></a> highlighted: <span class="likes">(<strong class="badge"><%= likes_count %></strong> likes)</span></p><blockquote><%= content %></blockquote><p>in <a href="<%= reading.book.permalink_url %>"><%= reading.book.title %></a> by <%= reading.book.author %></div></li>'),

	getHighlights: function( term, cb ) {
		$.getJSON( '/highlights?term=' + term, function( body ) {
			
			// console.log( body );
			
			cb( body );
		});
	},
	fillHighlights: function( highlights ) {
		$('#loading').hide();
		
		if( highlights.length < 1 )
		{
			$('#highlightList').html('<h2>Sorry, no highlights found.</h2>')
		}
		
		// console.log( highlights );
		_.each( highlights, function( hlt ) {
			// console.log( hlt );
		
			$('#highlightList').append( main.hiLite( hlt ) );
		});
	},
	getBooks: function( term, cb ) {
		$.getJSON( '/search?term=' + term, function( body ) {			
			cb( body );
		});
	},
	fillBooks: function( books ) {
		
		$('#loading').hide();
		
		if( books.length < 1 )
		{
			$('#bookList').html('<h2>Sorry, no books found.</h2>')
		}
		
		_.each( books, function( book ) {
			book.reading = 0;
			book.finished = 0;
			book.interesting = 0;
			book.abandoned = 0;
			book.readers = [];
			
			_.each( book.readings, function( reading ) {
				if( reading.reading.state == 'reading' ) {
					// console.log( reading.reading );
					book.readers.push( reading.reading.user );
					book.reading++;
				}
				else if( reading.reading.state == 'finished' ) {
					book.finished++;
				}
				else if( reading.reading.state == 'interesting' ) {
					book.interesting++;
				}
				else if( reading.reading.state == 'abandoned' ) {
					book.abandoned++;
				}
			});
			
			if( book.story == null )
			{
				book.story = 'No story or description available.'
			}
												
			$('#bookList').append( main.bookTemplate( book ) );
		});
	},
	doSearch: function( term ) {
		main.reset();
		
		main.getBooks( term, main.fillBooks);
		main.getHighlights( term, main.fillHighlights);
	},
	reset: function() {
		$('#bookList').html('');
		$('#highlightList').html('');
	},
	init: function() {
		// main.doSearch( 'Twain' );
		$('form').submit( function() {
			$('#prompt').slideUp();
			$('#loading').slideDown();
			main.doSearch( $('#search-query').val() );
			return false;
		});
		
		$('#reset').click( function() {
			main.reset();
			$('#prompt').slideDown();
			$('#search-query').val('').focus();
		});
	}
}
$(document).ready( main.init );