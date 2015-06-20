Session.setDefault('loginModal','false');
Session.setDefault('contactFormVisible','false');
Template.navbar.events({
    "click .goContact, tap .goContact": function () {
        Session.set('contactFormVisible', 'true');
    },
    "click .navbar-collapse.in": function(e){
        if( $(e.target).is('a') ) {
            $(".navbar-collapse").collapse('hide');
        }
    }
});

Template.loginMenu.events({
    "click .goLogin, tap .goLogin": function () {
        Session.set('loginModal','true');
    },
    "click .goLogOut, tap .goLogOut": function () {
        Meteor.logout();
    }
});

Template.loginMenu.helpers({
    getLogin: function(){
        return  Meteor.user().profile.name ;
    }
});

Template.loginForm.helpers({
    loginModal: function(){
        if (Session.get('loginModal') == 'true'){return true;}
        return null ;

    }
});
Template.loginForm.events({
    "click .btnClose, tap .btnClose": function () {
        Session.set('loginModal','false');
    },
    "click .btnConfirmed, tap .btnConfirmed": function (event, t) {
        Session.set('loginModal','false');
        event.preventDefault();
        var login = t.find('input[name="login"]') ? t.find('input[name="login"]').value : void 0;
        var email = login + '@bouyguestelecom.fr';
        if (login.length < 4 )
            return;
        var user = {email: email,password: email , profile: {name : login }};
        Meteor.call('createUserIsExist' , user) ;
        Meteor.loginWithPassword({email: email}, email, function(err){
            //if (err)
                // console.log(err);

        });
    }
});

Template.contactForm.helpers({
    contactFormVisible: function(){
        if (Session.get('contactFormVisible') == 'true'){return true;}
        return null ;

    }
});
Template.contactForm.events({
    "click .btnClose, tap .btnClose": function () {
        Session.set('contactFormVisible','false');
    },
    "click .btnConfirmed, tap .btnConfirmed": function (event, t) {
        Session.set('contactFormVisible','false');
        event.preventDefault();
        var text = t.find('textarea[name="feedbackText"]') ? t.find('textarea[name="feedbackText"]').value : void 0;
        var userMail = Meteor.user().emails[0].address || '';
        Meteor.call('sendFeedbackMail' , text, userMail) ;

    }
});