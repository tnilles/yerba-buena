Companies = new Meteor.Collection('companies');


addCompany = function(companyAttrs) {
    var user = Meteor.user(),
        companyInDB = Companies.findOne({name: companyAttrs.name});

    if (companyInDB && companyInDB._id)
        return companyInDB._id;

    // Pick out the whitelisted keys
    var company = _.extend(_.pick(companyAttrs, 'name'), {
        submitted: new Date().getTime(),
        userId: user._id
    });

    var companyId = Companies.insert(company);

    return companyId;
};