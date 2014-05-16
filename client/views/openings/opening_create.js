Template.openingCreate.settings = function() {
    return {
        position: "bottom",
        limit: 5,
        rules: [{
            collection: Companies,
            field: 'name',
            matchAll: true,
            template: Template.companyPill
        }]
    }
};