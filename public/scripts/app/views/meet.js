define([
	'jquery',
	'underscore',
    'backbone'
], function ($, _, Backbone) {
	
	var MeetView = Backbone.View.extend({
		// Cache the template function for a single item.
		template: _.template($('#meet-template').html()),
		
		// events
		events: {
			'submit form': 'submit'
		},
		
		initialize: function( options ) {
			this.asker = options.asker;
			this.receiver = options.receiver;
			
			if( options.introducers == null && options.introducer != null ) {
				this.introducers = [ options.introducer ];
			}			
			
		},

		// Re-render the titles of the todo item.
		render: function () {
			// console.log( this.asker );
			
			var introducers = new Array();
			_.each( this.introducers, function( intro ) {
				introducers.push( intro.toJSON() ) ;
			});
			
			// console.log( this.introducers );
			
			this.$el.html(this.template({
				'asker': this.asker.toJSON(),
				'introducers': introducers,
				'receiver': this.receiver.toJSON()
			}));
						
			return this;
		},
		
		submit: function() {
			// console.log( this.asker );
			
			this.remove();
			
			return false;
		}
	});
	
	return MeetView;
});