if (Openings.find().count() === 0) {
    Openings.insert({
        companyName: 'Google',
        location: 'Mountain View, CA',
        jobTitle: 'UI Engineer',
        description: 'Work on the gmail team, make tests, implement solutions for internal test first',
        notes: 'Contacted me via linkedin',
        url: 'http://google.com'
    });

    Openings.insert({
        companyName: 'Tactill',
        location: 'Montrouge, France',
        jobTitle: 'Web Developer',
        description: 'Tills on an iPad',
        notes: 'Greg called me',
        url: 'http://tactill.fr'
    });

    Openings.insert({
        companyName: 'Basecamp',
        location: 'Anywhere (remote)',
        jobTitle: 'Frontend dev',
        description: 'Work on their new project, a super-chat for companies',
        notes: 'Applied on their website',
        url: 'http://basecamp.com'
    });
}