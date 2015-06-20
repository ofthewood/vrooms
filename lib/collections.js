Rooms = new Meteor.Collection("rooms");
Meetings = new Meteor.Collection("meetings");
Timeslots = new Meteor.Collection("timeslots");

// index unique sur horaire  de timeslots
if (Meteor.isServer){
    Meteor.startup(function(){
        Timeslots._ensureIndex({horaire: 1}, {unique: 1});
    });
}

if (Meteor.isClient) {
    Filters = new Mongo.Collection(null);
}
// Timeslots
if (Meteor.isServer){
    Meteor.publish("Timeslots", function () {
        return Timeslots.find({});
    });
}
if (Meteor.isClient) {
    Meteor.subscribe("Timeslots");
}


// Last update
if (Meteor.isServer){
    Meteor.publish("LastUpdate", function () {
        return Rooms.findOne({}, {sort: {updatedAt: -1}});
    });
}


// Rooms
if (Meteor.isServer){
    Meteor.publish("Rooms", function () {
        return Rooms.find({},{fields: {agenda :0}});
    });
}
if (Meteor.isClient) {
    Meteor.subscribe("Rooms");
}

// publish dependent documents and simulate joins
if (Meteor.isServer){
    Meteor.publish("FreeTimeSlot", function () {
        return Meetings.find({dateFree : { $exists: true} }, {sort: {dateFree: -1},limit: 10 });
       // return Meetings.find({statut: 'free'});
        //return Meetings.find({});
    });
}
if (Meteor.isClient) {
    Meteor.subscribe("FreeTimeSlot");
}

/*  to see all msg ...

if (Meteor.isClient) {

    // log sent messages
    var _send = Meteor.connection._send;
    Meteor.connection._send = function (obj) {
        console.log("send", obj);
        _send.call(this, obj);
    };

    // log received messages
    Meteor.connection._stream.on('message', function (message) {
        console.log("receive", JSON.parse(message));
    });
}

    */