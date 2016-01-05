Meteor.startup(function () {
    Accounts.emailTemplates.from = "noreply@votresuivi.fr"
    Accounts.emailTemplates.sitename = "votresuivi.fr";

    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return 'Please confirm tour Email address';
    },
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
            return 'Click on the link below to verify your address: ' + url;
    }

    Accounts.config({
        sendVerificationEmail: true
    });
});


// Validate username, sending a specific error message on failure.
Accounts.validateNewUser(function (user) {
    // Ensure user name is long enough
    console.log(user);
    var passwordTest = new RegExp("(?=.{6,}).*", "g");
    if (passwordTest.test(user.password) == false) {
        throw new Meteor.Error(403, 'Your password is too weak!');
    }

    return true;
});

/*
Accounts.onCreateUser(function(options, user) {
    console.log('user',user);
    //Accounts.sendVerificationEmail(user._id)
    return user;
});
*/
/*
 // Support for playing D&D: Roll 3d6 for dexterity
 Accounts.onCreateUser(function(options, user) {
 console.log('after create', user, option);
 var role = "default";
 if ( user.profile.name == "vdubois") {
 console.log('set to admin ');
 role = "admin";
 }
 Roles.addUsersToRoles(user._id, role);
 return user;
 });
 */

Meteor.methods({

    createUserIsExist: function (user) {
        var isExist = Meteor.users.findOne({"emails.address": user.email});
        if (isExist) return true;

        id = Accounts.createUser(user);
        console.log('id',id);
        Accounts.sendVerificationEmail(id);
        var role = 'default';
        if (user.profile.name == 'vdubois') {
            role = 'admin';
        }
        Roles.addUsersToRoles(id, role);
    },
    removeUser: function (userId) {
        Meteor.users.remove({_id: userId}, function (error, result) {
            if (error) {
                console.log("Error removing user: ", error);
            } else {
                console.log("Number of users removed: " + result);
            }
        })
    }
});


