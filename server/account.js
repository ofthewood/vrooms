Meteor.methods({

    createUserIsExist: function (user) {
        var isExist  =   Meteor.users.findOne({"emails.address" : user.email });
        if ( isExist)
            return true;
        Accounts.createUser(user);
    }
});
