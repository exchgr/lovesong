define([
	'jquery',
	'bootstrap',
	'underscore',
    'backbone',
    'app/models/profile',
    'app/views/match'
], function ($, bootstrap, _, Backbone, Profiles, Match) {

	// The Dashboard View
	// ---------------

    profiles = Profiles;

	var Dashboard = Backbone.View.extend({
		el: '#content',

		initialize: function () {

			// this.listenTo(app.todos, 'reset', this.refresh);
            this.listenTo(profiles, 'reset', this.setMatch);
            this.listenTo(profiles, 'remove', this.setMatch);

			// fetch default profiles
			profiles.fetch({reset: true});

			// init the modal
			$('#match').modal({
                show: false
            });

		},

        setMatch: function () {
            var profile = profiles.at(0);

            var view = new Match({model: profile});

            $('#loading').slideUp();
            $('#profile').slideDown();

            $('#profile').html(view.render().el);
        },

	});

		// console.log( Dashboard );

		return Dashboard;
});
