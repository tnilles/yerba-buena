Template.historyItem.helpers({
    personName: function() {
        var person = Persons.findOne({_id: this.personId});
        if (person)
            return person.name;
        else {
            var opening = Openings.findOne({_id: this.openingId});
            var company = Companies.findOne({_id: opening.companyId});
            return company.name;
        }
    },
    at: function() {
        var date = new Date(this.date);
        return date.toDateString();
    },
    iconType: function() {
        switch (this.type) {
            case 'email':
                return 'glyphicon-envelope';
            break;

            case 'call':
                return 'glyphicon-earphone';
            break;

            case 'skype':
                return 'glyphicon-facetime-video';
            break;

            case 'on-site itw':
                return 'glyphicon-home';
            break;

            case 'mail':
                return 'glyphicon-pencil';
            break;

            default:
                return 'glyphicon-record';
            break;
        };
    }
});

Template.historyItem.events({
    'click .delete-history': function(e) {
        e.preventDefault();

        if (confirm('Delete this entry?')) {
            Histories.remove(this._id);
        }
    }
});