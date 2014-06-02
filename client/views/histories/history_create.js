Template.historyCreate.settings = function() {
    return {
        position: "bottom",
        limit: 5,
        rules: [{
            collection: Persons,
            field: 'name',
            matchAll: true,
            template: Template.personPill
        }]
    }
};

Template.historyCreate.events({
    'submit form.history-create': function(e, t) {
        e.preventDefault();

        var history = {
            type: getVal(e, 'type'),
            origin: getVal(e, 'origin'),
            person: getVal(e, 'personName'),
            date: getVal(e, 'date'),
            notes: getVal(e, 'notes'),
            openingId: this._id
        };

        Meteor.call('addHistory', history, function(error, id) {
            if (error) {
                alert(error.reason);
            } else {
                e.target.reset();

                $(t.firstNode).parent().find('.show-history-create').velocity({opacity: 1},{display: 'block'});
                $(t.firstNode).parent().find('.history-create').css({
                    opacity: 1,
                    lineHeight: 'auto'
                }).velocity({
                    opacity: 0,
                    lineHeight: 0
                },{display: 'none'});
            }
        });
    },
    'click .show-history-create': function(e, t) {
        e.preventDefault();

        $(t.firstNode).parent().find('.show-history-create').velocity({opacity: 0},{display: 'none'});
        $(t.firstNode).parent().find('.history-create').css({
            opacity: 0,
            lineHeight: 0
        }).velocity({
            opacity: 1,
            lineHeight: 'auto'
        },{display: 'block'});
    }
});