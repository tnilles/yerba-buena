Template.home.events({
    'click .sign-link' : function(e, t){
        e.preventDefault();

        if (Session.get('signStatus') === 'signup') {
            $('.flipper').css('-webkit-transform', 'rotateX(0deg)');
            Session.set('signStatus', 'signin');
        } else {
            $('.flipper').css('-webkit-transform', 'rotateX(180deg)');
            Session.set('signStatus', 'signup');
        }

        return false;
    }
});