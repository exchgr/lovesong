define([
	'jquery',
	'bootstrap',
	'underscore',
	'facebook',
    'backbone',
    'app/models/profile',
    'app/views/match'
], function ($, bootstrap, _, FB, Backbone, Profiles, Match) {

	// The Dashboard View
	// ---------------

    profiles = Profiles;

	var Dashboard = Backbone.View.extend({
		el: '#content',

		initialize: function () {
		    
		    $('#landing').slideUp();
		    
		    $('#logout').click(function() {
		        FB.logout(function() {
		            
		        });
		    });	    

			// this.listenTo(app.todos, 'reset', this.refresh);
            this.listenTo(profiles, 'reset', this.setMatch);
            this.listenTo(profiles, 'remove', this.switchMatch);

			// fetch default profiles
			profiles.fetch({reset: true});

			// init the modal
			$('#match').modal({
                show: false
            });

		},
		
		switchMatch: function() {
		    
		    // fetch more profiles
		    profiles.fetch();
		    
		    var profile = profiles.at(0);

            var view = new Match({model: profile});

            $('#profile').slideDown();

            $('#profile').html(view.render().el);
		},

        setMatch: function () {
            $('#loading').slideUp();
            
            this.switchMatch();
        },

	});

		// console.log( Dashboard );

		return Dashboard;
});
