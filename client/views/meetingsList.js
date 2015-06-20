if (Meteor.isClient) {
    var yesterday = moment().add(-1, 'day');
    var meetingDay  = Meteor.roomservice.nextWeekDay( yesterday.format());
    Session.set('meetingDay',meetingDay);
    //console.log(Session.get('meetingDay'));

    Template.meetingsList.events({
        'click .next, tap .next': function () {
            var nextDay = Meteor.roomservice.nextWeekDay(Session.get('meetingDay'));
            Session.set('meetingDay', nextDay);
        },
        'click .prev, tap .prev': function () {
            var nextDay = Meteor.roomservice.nextWeekDay(Session.get('meetingDay'),-1);
            Session.set('meetingDay', nextDay);
        },
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
    Template.meetingsList.helpers({
        filtre : function () {
            return Session.get('filtre');
        },
        creneaux: function(){
            return  [9, 10, 11, 14, 15, 16, 17];
          //return  [9];
        },
        horaireIs: function (horaire) {
            return moment(this.horaire).hour() == parseInt(horaire);;
        },
        meetingDay : function () {
            return moment(Session.get('meetingDay')).format('ddd LL') ;
        },
        getUserCount: function () {
            var count = Rooms.find().count();
            return count;
        },
        meetingListByHoraire : function (horaire){
            var where = _.where(Session.get('meetingsList'), {iHoraire:  parseInt(horaire)});
            return where;
        },
        meetingsListCursor: function () {
            var deb = moment(Session.get('meetingDay')).startOf('day').toDate();
            var end = moment(Session.get('meetingDay')).endOf('day').toDate();
            var cursor = Meetings.find(
                {$and: [
                    {horaire: {"$gt" : deb, "$lt" : end}} ,
                    {name : new RegExp(Session.get('filtre'),'i')}
                ]},
                { sort: { horaire: 1 }} );

            Meteor.meetingsFree = [];
            var  meetingsList  = [];
            // On stocke pour ..
            cursor.forEach(function(doc){
                var item = {};
                var decodeName = Meteor.roomservice.decodeRoomName(doc.name);
                item.shortName = decodeName.shortName;


                item.name = doc.name;
                item.debut = doc.debut;
                item.iHoraire = moment(doc.horaire).hour();
                meetingsList.push(item);

            });
            Session.set('meetingsList', meetingsList);
           // return  cursor;
        }
    });

    Template.meetingsListItem.helpers({
        FormateCreneau:  function(date) {
            return moment(date).format("HH mm")
        },
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

    Template.meetingsListItem1.helpers({
        shortSalle:  function() {
            var shortSalle = this.name.replace('Salle TEC','');
            shortSalle = shortSalle.substr(0,30);
            return shortSalle;
        }
    });



}