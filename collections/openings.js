Openings = new Meteor.Collection('openings');

Openings.allow({
    remove: ownsDocument
});

Meteor.methods({
    opening: function(openingAttrs) {
        var required = ['companyName', 'jobTitle', 'location'],
            user = Meteor.user();

        // Ensure all required fields are filled in
        _.each(required, function(field) {
            if (!openingAttrs[field])
                throw new Meteor.Error(422, 'Please fill in a ' + field);
        });

        var companyId = addCompany({
            name: openingAttrs.companyName
        });

        console.log('companyId; ', companyId)

        // Pick out the whitelisted keys
        var opening = _.extend(_.pick(openingAttrs, 'jobTitle', 'location', 'url', 'description', 'notes'), {
            companyId: companyId,
            submitted: new Date().getTime(),
            userId: user._id
        });

        var openingId = Openings.insert(opening);

        return openingId;
    }
});