Template.signin.events({
    'submit #login-form' : function(e, t){
        e.preventDefault();
        // retrieve the input field values
        var email = t.find('#email').value,
            password = t.find('#password').value;

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
            if (err) {
                // The user might not have been found, or their passwword
                // could be incorrect. Inform the user that their
                // login attempt has failed.
                $('#signinError').html('Your email/password don\'t match')
            } else {
                // The user has been logged in.
            }
        });
        return false;
    }
});