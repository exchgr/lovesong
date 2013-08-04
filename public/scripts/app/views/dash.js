define([
	'jquery',
	'underscore',
    'backbone',
	'app/models/profile',
	'app/views/match'
], function ($, _, Backbone, Profiles, Match) {
	// The Dashboard View
	// ---------------
	
	profiles = Profiles;

	var Dashboard = Backbone.View.extend({

		el: '#dashboard',
		

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {

			// this.listenTo(app.todos, 'reset', this.refresh);
			this.listenTo(profiles, 'add', this.setMatch);
			
			// console.log( Profiles );
			
			profiles.add({
				'name': 'Samantha Xu'
			});
			
			// console.log( Profiles );
		},

		render: function () {
		},

		setMatch: function (profile) {			
			var view = new Match({ model: profile });
			$('#quick-match').html(view.render().el);
			
			// console.log( view );
		},

	});
	
	// console.log( Dashboard );
	
	return Dashboard;
});