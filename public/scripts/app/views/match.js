define([
	'jquery',
	'underscore',
    'backbone',
	'app/models/profile'
], function ($, _, Backbone, Profiles) {
    
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
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
            this.$el.html(this.template({model: this.model.toJSON()}));
            
            console.log(this.template({model: this.model.toJSON()}));
            
            console.log('rendered');
            
            return this;
        },
    });
    // 
    return Match;
});