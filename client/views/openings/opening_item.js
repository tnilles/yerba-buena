Template.openingItem.helpers({
    companyName: function() {
        var company = Companies.findOne({_id: this.companyId, userId: Meteor.user()._id});
        if (company)
            return company.name;
    },
    persons: function() {
        return Persons.find({openingId: this._id}, {sort: {submitted: 1}});
    },
    anyPersons: function() {
        return Persons.find({openingId: this._id}, {sort: {submitted: 1}}).count() > 0;
    }
});

Template.openingItem.events({
    'click a.add-person-link': function(e, t) {
        $(t.firstNode).find('.add-person-link').hide();
        $(t.firstNode).find('.add-person-form').css('display', 'inline-block');
    },
    'submit .add-person-form form': function(e) {
        e.preventDefault();

        var person = {
            name: getVal(e, 'personName'),
            companyId: this.companyId,
            openingId: this._id
        };

        Meteor.call('addPerson', person, function(error, id) {
            if (error) {
                alert(error.reason);
            } else {
                e.target.reset();
            }
        });
    },
    'click .delete-person': function(e) {
        e.preventDefault();

        if (confirm('Delete this relation?')) {
            Persons.remove(this._id);
        }
    }
});