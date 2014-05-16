Template.signup.events({
    'submit #register-form' : function(e, t) {
        e.preventDefault();
        var email = t.find('#email').value,
            password = t.find('#password').value;

        // Trim and validate the input

        Accounts.createUser({email: email, password : password}, function(err){
            if (err) {
                // Inform the user that account creation failed
            } else {
                // Success. Account has been created and the user
                // has logged in successfully.
            }
        });

        return false;
    }
});