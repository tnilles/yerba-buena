Template.openingsList.helpers({
    openings: function() {
        return Openings.find({}, {sort: {status: 1, submitted: -1}});
    },
    anyOpenings: function() {
        return Openings.find({}, {sort: {submitted: -1}}).count() > 0;
    }
});

Deps.autorun(function() {
    if (Session.get('addOpeningOpened')) {
        $('#openings').velocity({
            marginRight: '67px',
            left: '-100%'
        });
        $('.opening').velocity({ opacity: 0 });
        $('.add-opening .open').velocity({ opacity: 0 });
        $('.add-opening .close').velocity({ opacity: 1 });
        $('#opening-create').velocity({
            left: 0,
            margin: 0,
            opacity: 1
        });
    } else {
        $('#openings').velocity({
            marginRight: '0px',
            left: '0'
        });
        $('.opening').velocity({ opacity: 1 });
        $('html').velocity('scroll', {offset: 0});
        $('.add-opening .open').velocity({ opacity: 1 });
        $('.add-opening .close').velocity({ opacity: 0 });
        $('#opening-create').velocity({
            opacity: 0,
            left: '100%',
            marginLeft: '170px'
        });
    }
});

Template.openingsList.events({
    'click .add-opening': function() {
        if (!Session.get('addOpeningOpened')) {
            Session.set('addOpeningOpened', true);
        } else {
            Session.set('addOpeningOpened', false);
        }
    },
    'submit #opening-create form': function(e) {
        e.preventDefault();

        var opening = {
            companyName: getVal(e, 'companyName'),
            location: getVal(e, 'location'),
            jobTitle: getVal(e, 'jobTitle'),
            notes: getVal(e, 'notes'),
            url: getVal(e, 'url')
        };

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
    },
    'click .archive-opening': function(e) {
        e.preventDefault();

        var status = (this.status === 'active') ? 'archived' : 'active';

        Openings.update(this._id, {$set: {status: status}}, function(error) {
            if (error)
                alert(error.reason);
        });
    }
});