Template.editContact.events({
    'submit .add-contact-address': function(e) {
        e.preventDefault();

        Persons.update(this._id, {$addToSet: {addresses: getVal(e, 'contact-address')}}, function(error) {
            if (error)
                alert(error.reason);
        });

        e.target.reset();
    },
    'click .delete-address': function(e, t) {
        e.preventDefault();

        if (confirm('Delete this address?')) {
            Persons.update(t.data._id, {$pull: {addresses: $(e.target).parent().find('.address').text()}}, function(error) {
                if (error)
                    alert(error.reason);
            });
        }
    }
});