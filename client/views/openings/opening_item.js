Template.openingItem.helpers({
    companyName: function() {
        console.log('id: ', this)
        console.log('userId: ', Meteor.user()._id)
        var company = Companies.findOne({_id: this.companyId, userId: Meteor.user()._id});
        if (company)
            return company.name;
    }
});