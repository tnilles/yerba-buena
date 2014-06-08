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
    },
    openingType: function() {
        return Openings.findOne({_id: this._id}).status;
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
    },
    'keyup textarea[name=notes]': function(e, t) {
        Openings.update(t.data._id, {$set: {notes: e.target.value}}, function(error) {
            if (error)
                alert(error.reason);
        });
    },
    'click .person-name': function(e) {
        e.preventDefault();

        $('.modal-sm-' + this._id + this.openingId).modal('show');
    }
});

Template.openingItem.rendered = function() {
    $('.autosize', $(this.firstNode)).autosize();
};
