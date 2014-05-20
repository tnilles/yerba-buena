Persons = new Meteor.Collection('persons');

Persons.allow({
    remove: ownsDocument
});

Meteor.methods({
    addPerson: function(personAttrs) {
        var userId = Meteor.user()._id;

        // Verify if the person is added to a company known to the user
        if (Companies.find({userId: userId}).count() === 0)
            throw new Meteor.Error(401, 'You cannot add a person to this company');

        // Same stuff for opening
        if (Openings.find({userId: userId}).count() === 0)
            throw new Meteor.Error(401, 'You cannot add a person to this opening');

        // Pick out the whitelisted keys
        var person = _.extend(_.pick(personAttrs, 'name', 'companyId', 'openingId'), {
            submitted: new Date().getTime(),
            userId: userId
        });

        var personId = Persons.insert(person);

        return personId;
    }
});