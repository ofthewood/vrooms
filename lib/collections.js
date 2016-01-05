Rooms = new Meteor.Collection("rooms");
Meetings = new Meteor.Collection("meetings");
Timeslots = new Meteor.Collection("timeslots");
LastUpdate = new Meteor.Collection("lastupdate");
Logs = new Meteor.Collection("logs");


if (Meteor.isServer){

    Meteor.startup(function(){
        console.log('init lastUpdate ...');
        LastUpdate.remove({});
        LastUpdate.insert({lastdate:moment().toDate()});

        // index  unique sur timeslots
        Timeslots._ensureIndex({horaire: 1}, {unique: 1});

    });

    Meteor.publish("LastUpdate", function () {
        return LastUpdate.find({});
    });
    Meteor.publish("Timeslots", function () {
        return Timeslots.find({});
    });

    //  on supprime Rooms ... trop de maj
    Meteor.publish("Rooms", function () {
       // return Rooms.find({},{fields: {agenda :0}});
    });

    //  on supprime meetings ... trop de maj
    Meteor.publish("FreeTimeSlot", function () {
       // return Meetings.find({dateFree : { $exists: true} }, {sort: {dateFree: -1},limit: 10 });
        // return Meetings.find({statut: 'free'});
        //return Meetings.find({});
    });

    Meteor.publish("UsersData", function () {
        console.log('UsersData userId', this.userId );
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            return Meteor.users.find();
        } else {
            this.stop();
            return;

        }
    })

    Meteor.publish("UserConnections", function () {
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            return UserConnections.find();
        } else {
            this.stop();
            return;

        }
    })

}


if (Meteor.isClient) {
    Meteor.subscribe("LastUpdate");
    Meteor.subscribe("Timeslots");
    Meteor.subscribe("Rooms");
    Meteor.subscribe("FreeTimeSlot");
    // uniquement sur client.
    Filters = new Mongo.Collection(null);
    RoomsBooked = new Mongo.Collection(null);

}


// publish dependent documents and simulate joins
if (Meteor.isServer){

}
if (Meteor.isClient) {

}


