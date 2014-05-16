// Hooks
var IRHooks = {
    requireLogin: function(pause) {
        if (Meteor.loggingIn()) {
            this.render('loading');
            pause();
        } else if (!Meteor.user()) {
            this.render('accessDenied');
            pause();
        }
    },
    clearErrors: function(pause) {
        //clearErrors();
    }
};

/*Router.onAfterAction(IRHooks.clearErrors);
Router.onBeforeAction(IRHooks.requireLogin, {only: ['postSubmit']});*/

Router.configure({
    layoutTemplate: 'masterLayout'
});

// Routes
Router.map(function() {
    this.route('home', {
        path: '/'
    });

    this.route('signup', {
        path: '/signup'
    });

    this.route('openingsList', {
        path: '/openings'
    });
});