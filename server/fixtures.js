if (Openings.find().count() === 0) {
    var testUserId = Accounts.createUser({email: 'test@test.com', password : 'test'});

    var google = Companies.insert({
        name: 'Google',
        userId: testUserId
    });

    var basecamp = Companies.insert({
        name: 'Basecamp',
        userId: testUserId
    });

    var tactill = Companies.insert({
        name: 'Tactill',
        userId: testUserId
    });

    Openings.insert({
        companyId: google,
        location: 'Mountain View, CA',
        jobTitle: 'UI Engineer',
        notes: 'Work on the gmail team, make tests, implement solutions for internal test first. Contacted me via linkedin',
        url: 'http://google.com',
        userId: testUserId
    });

    Openings.insert({
        companyId: tactill,
        location: 'Montrouge, France',
        jobTitle: 'Web Developer',
        notes: 'Tills on an iPad.',
        url: 'http://tactill.fr',
        userId: testUserId
    });

    Openings.insert({
        companyId: basecamp,
        location: 'Anywhere (remote)',
        jobTitle: 'Frontend dev',
        notes: 'Work on their new project, a super-chat for companies. Applied on their website',
        url: 'http://basecamp.com',
        userId: testUserId
    });
}