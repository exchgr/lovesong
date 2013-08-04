define([
	'jquery',
	'underscore',
    'backbone',
    'facebook',
	'app/models/profile'
], function ($, _, Backbone, FB, Profiles) {

    _.templateSettings = {
        evaluate : /\{\( (.+?) \)\}/gi,
        interpolate : /\{\{ (.+?) \}\}/gi,
    };
    
    // cache the template
    var template = _.template($('#profile-template').html())

    var Match = Backbone.View.extend({
        template: template,

        // The DOM events specific to an item.
        events: {
            'click #dislike': 'dislike',
            'click #like': 'like',
            // 'click .destroy': 'clear',
            // 'keypress .edit': 'updateOnEnter',
            // 'blur .edit': 'close'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        
        // dislike someone
        dislike: function() {
            
            this.model.destroy();
            this.remove();
            
        },
        
        // like someone
        like: function() {
            
            FB.ui({
              method: 'send',
              to: this.model.get('fbid'),
              link: 'http://google.com'
            });
            
        },

        // Re-render the titles of the todo item.
        render: function () {
            var model = this.model.toJSON();
            
            model.firstName = model.displayName.split(" ")[0];
                                                                                                
            this.$el.html(this.template({profile: model, bands: model.shared, match: Math.floor(model.percent)}));
                        
            return this;
        },
    });
    //
    return Match;
});
