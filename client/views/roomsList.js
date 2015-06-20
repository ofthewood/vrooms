if (Meteor.isClient) {

    Session.setDefault('filtre', 'salle tec');

    Template.roomsList.events({
        'click .box, tap .box': function () {
            Session.set('filtre', 'box');
        },
        'click .salles, tap .salles': function () {
            Session.set('filtre', 'salle tec');
        },
        'click .visio, tap .visio': function () {
            Session.set('filtre', 'salle visio');
        }
    });
    Template.roomsList.helpers({
        filtre : function () {
            return Session.get('filtre');
        },
        getUserCount: function () {
            var count = Rooms.find().count();
            return count;
        },
        usersList: function () {
            var search = Session.get('filtre');
            return   Rooms.find({name : new RegExp(search,'i')}, { sort: { updatedAt: -1 }});
            //return   Rooms.find({name : { $regex: /^salle/i }}, { sort: { updatedAt: -1 }});
        }
    });

    Template.roomListItem.helpers({
        getEmail: function () {
            if (this.emails) {
                return this.emails[0].address;
            } else {
                return '';
            }
        },
        formatedDate: function(){
            return moment(this.updatedAt).format('ddd LLL');
        },
        NbMeetingsFree: function(){
           // var count = Meetings.find({$and: [{name: this.name},{statut: 'free'}]}).count();
            var count = 0 ;
            return count;
        }
    });

    Template.roomListItem.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            Tasks.update(this._id, {$set: {checked: ! this.checked}});
        },
        "click .fa-times": function () {
            Meteor.call('removeUser',this._id);
        },
        "click .fa-eye": function () {

            //var toto =  Meteor.roomservice.decodeRoomName(this.name);
            //var meetings =  Meteor.roomservice.getMeetingsFromAgenda(this.agenda);
            //Meteor.roomservice.meetingsUpdate(meetings,this.name);
            var s = "2015-07-03T10:00:00.000+0200";

            //Meteor.roomservice.updSyntheseHoraire(moment(s).toDate());

            //var toto = Meteor.call('sendMeetingMail' );

            // on récupère les anciens
            // on compate meeting par meeting .   update des <>
            // a la fin on supprime les meetings hors horaire...

            /* Meteor.call('impersonate', userId, function(err) {
             if (!err) {
             Meteor.userId = function() { return userId;};
             Router.go(AccountsEntry.settings.dashboardRoute);
             }
             });
             */
           // Router.go('webcal:http://www.votresuivi.info/noan.ics');
           // Router.go('http://www.votresuivi.info/img?file=toto.ics');

            HTTP.get("http://www.votresuivi.info/img?file=toto.ics",
                {data: {some: "json", stuff: 1}},
                function (error, result) {
                    if (!error) {
                        Session.set("twizzled", true);
                    }
                    Router.go('http://www.votresuivi.info/img?file=toto.ics');
                });


        }
    });

}