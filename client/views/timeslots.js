Template.timeslots.helpers({
    icsfile: function(){
        return Meteor.absoluteUrl() + 'icsfile?id=' + this._id;
    },
    counter: function(){
        var meeting = Meetings.findOne(this._id);
        if(! meeting){return null};
        if(! meeting.counter){return null};
        if( meeting.counter == 0){return null};
        return meeting.counter;
    },
    isNewDay: function(){
        //debugger;
        var isNewDay = false;
        if (moment(this.horaire).hour() == 9 || Session.get('FirstTimeSlotId') == this._id ) {
            isNewDay = true;
        }
        return isNewDay;
    },
    timeslot: function(date){
        return moment(date).format('ddd DD MMM HH:mm') + ' - ' + moment(date).add(1, 'hour').format('HH:mm');
    },
    shortTimeslot: function(date){
        return moment(date).format('HH') + 'h-' + moment(date).add(1, 'hour').format('HH') + 'h';
    },
    listeSalles: function(){
        //debugger;
        var liste  = "";
         this.listSalle;
        for (var i = 0; i < (this.listSalle.length); i++) {
            liste = liste + " <BR> " +  this.listSalle[i].name;

        }
        return  liste ;
    },
    hasToShowed: function(categorie){
        //  in this.categorie
        // in this .horaire
        //  2 cas   affichage globale catégorie
        // affichage  demandée de horaire / categorie

        // hidden show
        //debugger;
        Session.get('flipFlapFilter');
        var isFound = Filters.findOne({horaire: this.horaire, categorie: categorie});
        if(isFound){
            return true;
        }else{
            return false;
        }

    },
   isShowed: function(categorie){
        //  in this.categorie
        // in this .horaire
        //  2 cas   affichage globale catégorie
        // affichage  demandée de horaire / categorie

       // hidden show
       //debugger;
       Session.get('flipFlapFilter');
       var isFound = Filters.findOne({horaire: this.horaire, categorie: categorie});
       if(isFound){
           return "show"
       }else{
           return "hidden"
       }

    },
    formatedDay: function(date){
        return moment(date).format('dddd LL');
    },
    dispos: function(){
        return "(" + this.iNbSalle + "/"+ this.iNbBox + "/"+ this.iNbAutre + ")";
    },
    lastUpdate: function(){
        Session.get('refreshInterval');
        var lastUdpateRoom = Rooms.findOne({}, {sort: {updatedAt: -1}});
        if (! lastUdpateRoom) { return null;}
        var a = moment();
        var b = moment(lastUdpateRoom.updatedAt);
        return " Maj: " + moment(lastUdpateRoom.updatedAt).fromNow();
    },
    actu: function(){
        Session.get('refreshInterval');
        var a = moment();
        var b = moment(this.updatedAt);
        var diff = a.diff(b, 'minutes');
        if ( !(typeof this.updatedAt === 'undefined')) {
            if (diff < 16 && this.mvt != 0 ) {
                return "(" + this.mvt + ") " + moment(this.updatedAt).fromNow();
            }
        }
    },
    timeslotsList: function () {
        var  deb = moment().add(-1, 'hour').toDate();
        var  cursor =    Timeslots.find({horaire: { $gt: deb}}, {sort: {horaire: 1}}).fetch(); // sans le fetch pastop ...
        if(! cursor[0]) {return};
        Session.set('FirstTimeSlotId',cursor[0]._id);
        return cursor;
    }
});

Template.timeslots.events({
    "click .item-salle, tap .item-salle": function (){
        Meteor.roomservice.flipFlapFilter(this.horaire, this.iNbSalle, "salle");
    },
    "click .item-box, tap .item-box": function (){
        Meteor.roomservice.flipFlapFilter(this.horaire,this.iNbBox,  "box");
    },
    "click .item-autre, tap .item-autre": function (){
        Meteor.roomservice.flipFlapFilter(this.horaire,this.iNbAutre, "autre");
    },
    "click .sendMail, tap .sendMail": function (e){
        if(! Meteor.user()) {
                alert('Veuillez saisir votre @mail d\'abord');
                return;
        }
        var userMail = Meteor.user().emails[0].address || '';
        Meteor.call("sendMeetingMail", this._id,userMail);
        $(e.currentTarget).removeClass("animated tada").addClass("animated wobble");
        //Meetings.update(this._id, {$inc: { counter: 1 }});

    },
    "click .uploadCalendar, tap .uploadCalendar": function (e){
        $(e.currentTarget).removeClass("animated tada").addClass("animated wobble");
       /* var fileUrl = Meteor.absoluteUrl() + '/icsfile?id=' + this._id;
        console.log(fileUrl);
        Router.go(fileUrl);
    */

    }

});


