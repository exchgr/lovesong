define([
	'jquery',
	'underscore',
    'backbone',
], function ($, _, Backbone) {
	// The Dashboard View
	// ---------------
	
	// profiles = Profiles;
	// 
		var Dashboard = Backbone.View.extend({
			el: '#content',

			initialize: function () {
	
				// this.listenTo(app.todos, 'reset', this.refresh);
				// this.listenTo(profiles, 'add', this.setMatch);
				
				// console.log( Profiles );
				
				// profiles.add({
					// 'name': 'Samantha Xu'
				// });
				
				console.log('this was reached');
				
				// console.log( Profiles );
			},
	
			render: function () {
			},
	
			// setMatch: function (profile) {			
			// 				var view = new Match({ model: profile });
			// 				$('#quick-match').html(view.render().el);
			// 				
			// 				// console.log( view );
			// 			},
	
		});
		
		// console.log( Dashboard );
		
		return Dashboard;
});