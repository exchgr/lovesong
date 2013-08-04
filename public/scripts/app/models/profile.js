define([
	'jquery',
	'underscore',
    'backbone'
], function ($, _, Backbone) {
	
	// Profile Model
	// ---------------
	var Profile = Backbone.Model.extend({
		
		defaults: function() {
			return {
				name: "Elizabeth Xu",
				age: 21,
				gender: 'female',
				sexuality: 'straight',
				location: 'New York, NY',
				image: 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-frc1/34099_404249453171_3733301_n.jpg'
			};
		}
		
	});
	
	// Profiles Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Profiles = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Profile,
		
		url: '/api/recommendations',
		
	});
	
	// Note that we export the entire collection
	// --- if we need to use the model, we can just use Profiles.model
    return new Profiles;
});