Template.historiesList.helpers({
    histories: function() {
        return Histories.find({openingId: this._id}, {sort: {date: -1}});
    },
    anyHistories: function() {
        return Histories.find({openingId: this._id}, {sort: {date: -1}}).count() > 0;
    }
});