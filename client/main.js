Template.masterLayout.events({
    'click #logout' : function(e, t){
        e.preventDefault();

        Meteor.logout();

        return false;
    }
});

openingsHandle = Meteor.subscribe('openings');
companiesHandle = Meteor.subscribe('companies');
personsHandle = Meteor.subscribe('persons');