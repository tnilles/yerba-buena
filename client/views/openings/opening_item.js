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
        console.log('this: ', this)
        /*
        _id: "sW5Pq99tgYRxDvQqD"
        companyId: "ve47vQXDSddRBjMnL"
        description: "Tills on an iPad"
        jobTitle: "Web Developer"
        location: "Montrouge, France"
        notes: "Greg called me"
        url: "http://tactill.fr"
        userId: "7fdAj7anrNDiwhZhY"
        */
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

        console.log('person: ', person)

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

        console.log('atempt to delete ', this)

        if (confirm('Delete this relation?')) {
            Persons.remove(this._id);
        }
    }
    /*'submit form': function(e) {
        e.preventDefault();

        var opening = {
            companyName: getVal(e, 'companyName'),
            location: getVal(e, 'location'),
            jobTitle: getVal(e, 'jobTitle'),
            description: getVal(e, 'description'),
            notes: getVal(e, 'notes'),
            url: getVal(e, 'url'),
        };

        console.log(opening)

        Meteor.call('opening', opening, function(error, id) {
            if (error) {
                alert(error.reason);
            } else {
                e.target.reset();
                Session.set('addOpeningOpened', false);
            }
        });
    },
    'click .delete-opening': function(e) {
        e.preventDefault();

        if (confirm('Delete this opening?')) {
            Openings.remove(this._id);
        }
    }*/
});