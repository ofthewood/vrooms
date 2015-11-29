/*
 toute les nuits on envoie un mail r�capitulatif ...

 */

var lastday = lastday || moment().day();

//var delay = 10 * 1000; // 10 s
var delay = 15 * 60 * 1000; // 5 min




analyseRooms = function(){
    var count = 0;
    Rooms.find().forEach(function (room) {
        try {
            roomProperties = Agenda.decodeRoomName(room.name);
        } catch(e){
            console.log(room.name + ' ' + e); // on gère l'erreur
            return ;
        }
        console.log("name " + count + ": " + room.name + "  /" + roomProperties.categorie + "/" +
                    roomProperties.visio + '  |' + roomProperties.place + '|'  +  roomProperties.infoName );
       // console.log(roomProperties);

        count += 1;
    });

};

PurgeRooms = function(){
    line = "Suppression des Timeslots, nb: " + Timeslots.remove({});
    console.log(line);
    line = "Suppression des meetings, nb: " + Meetings.remove({});
    console.log(line);
    line = "Suppression des rooms, nb: " + Rooms.remove({});
    console.log(line);

};

//analyseRooms();
// PurgeRooms();

Meteor.setInterval(function () {
    if (lastday == moment().day()) {
        return;
    }
    lastday = moment().day();
    var content = "", line = "";

    line = "\n---- Meeting & Timeslots -----";
    console.log(line);
    content = content + "\n" + line;
    // On supprime les meeting  et timeslots  de la veille
    var cutOff = moment().add(-1, 'day').endOf("day").toDate();

    line = "Suppression des anciens meeting, nb: " + Meetings.remove({horaire: {$lt: cutOff}});
    console.log(line);
    content = content + "\n" + line;

    line = "Suppression des anciens timesslots, nb: " + Timeslots.remove({horaire: {$lt: cutOff}});
    console.log(line);
    content = content + "\n" + line;


    line = "\n---- Rooms -----";
    console.log(line);
    content = content + "\n" + line;
    line = "nb rooms: " + Rooms.find().count();
    console.log(line);
    content = content + "\n" + line;


    var deb = moment().add(-24, 'hour').toDate();
    var cursor = Rooms.find({updatedAt: {$lt: deb}}).fetch();
    var updateTimslots = false;

    for (var i in cursor) {
        updateTimslots = true;
        line = 'pb de maj sur ' + cursor[i].name + ' last update: ' + '  ' + moment(cursor[i].updatedAt).format('ddd LLL');
        console.log(line);
        content = content + "\n" + line;
        line = 'Suppression des meetings de la salle, Nb:' + Meetings.remove({mail: cursor[i].mail});
        console.log(line);
        content = content + "\n" + line;
    } // fin boucle



    line = "\n---- users -----";
    console.log(line);
    content = content + "\n" + line;
    line = "nb users: " + Meteor.users.find().count();
    console.log(line);
    content = content + "\n" + line;

    var cursor = Meteor.users.find({}).fetch();
    for (var i in cursor) {
        line = '--- ' + cursor[i].emails[0].address + '' + moment(cursor[i].createdAt).format('ddd LLL');
        console.log(line);
        content = content + "\n" + line;
    } // fin boucle



    line = "\n---- Re Calcul  Timeslots-----";
    console.log(line);
    content = content + "\n" + line;
    var cursor2 = Timeslots.find({}, {sort: {horaire: 1}}).fetch();
    for (var i in cursor2) {
        line = 'Recalcul  ' + moment(cursor2[i].horaire).format('ddd LLL');
        console.log(line);
        content = content + "\n" + line;
        Agenda.updSyntheseHoraire(cursor2[i].horaire);
    }


    var options = {
        to: "vdubois@bouyguestelecom.fr",
        from: "noreply@votresuivi.fr",
        subject: "Maintenance",
        text: content
        //html: Assets.getText('mail.html')
    };

    Email.send(options);


}, delay);


var recalculAllTimeslots = function () {
    var line, content;
    var cursor = Timeslots.find().fetch();
    for (var i in cursor) {
        line = 'Recalcul  ' + moment(cursor[i].horaire).format('ddd LLL');
        console.log(line);
        content = content + "\n" + line;
        Agenda.updSyntheseHoraire(cursor[i].horaire);

    } // fin boucle

};
