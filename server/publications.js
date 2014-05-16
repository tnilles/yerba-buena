Meteor.publish('openings', function(limit) {
    return Openings.find({userId: this.userId}, {sort: {submitted: -1}});
});