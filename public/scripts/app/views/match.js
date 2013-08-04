define([
	'jquery',
	'bootstrap',
	'underscore',
    'backbone',
	'app/models/profile'
], function ($, bootstrap, _, Backbone, Profiles) {

    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{\>(.+?)\}\}/g
    };

    // cache the template
    var template = _.template($('#profile-template').html())

    var Match = Backbone.View.extend({
        template: template,

        // The DOM events specific to an item.
        events: {
            // 'click .meet': 'startMeet',
            // 'dblclick label': 'edit',
            // 'click .destroy': 'clear',
            // 'keypress .edit': 'updateOnEnter',
            // 'blur .edit': 'close'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        // Re-render the titles of the todo item.
        render: function () {
            var model = this.model.toJSON();
                        
            this.$el.html(this.template({model: model, bands: model.shared}));
                        
            return this;
        },
    });
    //
    return Match;
});
