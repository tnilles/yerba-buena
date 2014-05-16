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

        // Pick out the whitelisted keys
        var opening = _.extend(_.pick(openingAttrs, 'companyName', 'jobTitle', 'location', 'url', 'description', 'notes'), {
            submitted: new Date().getTime(),
            userId: user._id
        });

        var openingId = Openings.insert(opening);

        return openingId;
    }
});