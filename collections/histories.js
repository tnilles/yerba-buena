Histories = new Meteor.Collection('histories');

Histories.allow({
    remove: ownsDocument
});

Meteor.methods({
    addHistory: function(historyAttrs) {
        var required = ['type', 'origin', 'date'],
            user = Meteor.user(),
            personId, person, companyId;

        // Ensure all required fields are filled in
        _.each(required, function(field) {
            if (!historyAttrs[field] && historyAttrs[field] !== '')
                throw new Meteor.Error(422, 'Please fill in a ' + field);
        });

        // Ensure that we own this opening
        if (Openings.find({userId: user._id, _id: historyAttrs.openingId}).count() === 0)
            throw new Meteor.Error(401, 'You cannot add an history item to this opening');

        // Fetch the person and ensure s/he exists. If not, create him/her
        person = Persons.findOne({name: historyAttrs.person});
        if (person) {
            personId = person._id;
        } else if (historyAttrs.person === '') {
            personId = null;
        } else {
            companyId = Openings.findOne({_id: historyAttrs.openingId}).companyId;

            personId = Persons.insert({
                name: historyAttrs.person,
                companyId: companyId,
                openingId: historyAttrs.openingId,
                submitted: new Date().getTime(),
                userId: user._id
            });
        }


        // Pick out the whitelisted keys
        var history = _.extend(_.pick(historyAttrs, 'type', 'origin', 'date', 'notes', 'openingId'), {
            personId: personId,
            submitted: new Date().getTime(),
            userId: user._id
        });

        var historyId = Histories.insert(history);

        return historyId;
    }
});