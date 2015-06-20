// Use 'greeting' Session variable as a reactive data source
Session.set('refreshInterval', 0);
Meteor.setInterval(function() {
    Session.set('refreshInterval', Session.get('refreshInterval') + 1);
}, 10000);

Template.lastFreeMeetings.helpers({
    formatedDate: function(date){
        return moment(date).format('ddd LLL');
    },
    relativeDate: function(date){
        Session.get('refreshInterval');
        return moment(date).fromNow();
    },
    meetingsList: function () {
        var  cursor =    Meetings.find({dateFree : { $exists: true} }, {sort: {dateFree: -1},limit: 10 }).fetch(); // sans le fetch pastop ..
        //var  cursor =    Meetings.find().fetch(); // sans le fetch pastop ...
        return cursor;
        //return   Rooms.find({name : { $regex: /^salle/i }}, { sort: { updatedAt: -1 }});
    }
});

Template.lastFreeMeetings.events({
    "click .sendMail, tap .sendMail": function (e){
        if(! Meteor.user()) {
            alert('Veuillez saisir votre @mail d\'abord');
            return;
        }
        var userMail = Meteor.user().emails[0].address || '';
        Meteor.call("sendMeetingMail", this._id,userMail);
        $(e.currentTarget).removeClass("animated tada").addClass("animated wobble");
        //Meetings.update(this._id, {$inc: { counter: 1 }});

    }

});