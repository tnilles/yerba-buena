Meteor.publish('openings', function(limit) {
    return Openings.find({userId: this.userId}, {sort: {submitted: -1}});
});

Meteor.publish('companies', function(limit) {
    return Companies.find({userId: this.userId}, {sort: {submitted: -1}});
});