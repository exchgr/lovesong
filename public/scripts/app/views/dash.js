define([
	'jquery',
	'underscore',
    'backbone',
    'app/models/profile',
    'app/views/match'
], function ($, _, Backbone, Profiles, Match) {
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    
	// The Dashboard View
	// ---------------
	
    profiles = Profiles;

	var Dashboard = Backbone.View.extend({
		el: '#content',

		initialize: function () {

			// this.listenTo(app.todos, 'reset', this.refresh);
            this.listenTo(profiles, 'reset', this.setMatch);
			
			// console.log( Profiles );
			
			// profiles.add({
				// 'name': 'Samantha Xu'
			// });
			
			// fetch default profiles
			profiles.fetch({reset: true});
			
			console.log('this was reached');
			
			// console.log( Profiles );
		},

		render: function () {
		},

        setMatch: function () {
            var profile = profiles.at(0);
            
            var view = new Match({model: profile});
            $('#profile-template').html(view.render().el);
        },

	});
		
		// console.log( Dashboard );
		
		return Dashboard;
});