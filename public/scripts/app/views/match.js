define([
	'jquery',
	'underscore',
    'backbone',
	'app/models/profile',
	'app/views/meet'
], function ($, _, Backbone, Profiles, MeetView) {
	
	var Match = Backbone.View.extend({
		// Cache the template function for a single item.
		template: _.template($('#profile-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .meet': 'startMeet',
			// 'dblclick label': 'edit',
			// 'click .destroy': 'clear',
			// 'keypress .edit': 'updateOnEnter',
			// 'blur .edit': 'close'
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			// this.listenTo(this.model, 'change', this.render);
			// this.listenTo(this.model, 'destroy', this.remove);
			// this.listenTo(this.model, 'visible', this.toggleVisible);
		},
		
		startMeet: function () {
			// console.log( 'sam ' );
			// console.log( new Profiles.model );
			
			var view = new MeetView({
				asker: this.model,
				introducer: new Profiles.model,
				receiver: new Profiles.model({'name': 'Bongol'})
			});
			
			$('body').append(view.render().el);
			
			return false;
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			// this.$el.toggleClass('completed', this.model.get('completed'));
			// this.toggleVisible();
			// this.$input = this.$('.edit');
			return this;
		},
	});
	
	return Match;
});