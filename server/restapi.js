// me notifier
//Email.send({
//    from: 'vdubois@ma-visibilite-digitale.fr',
//    to: 'vdubois@bouyguestelecom.fr',
//    subject: "New user",
//    text: "If you're reading this, sending an email through Meteor really was that easy"
//});
//console.log('mail send');
/*var toto = Assets.getText('essai.ics');
 console.log(toto);
 EmailAtt.send({to:"vdubois@bouyguestelecom.fr",
 from:"vdubois@ma-visibilite-digitale.fr",
 subject: "Test attachment",
 // A list of attachments.


 attachmentOptions: [
 // Each attachment conforms to mailcomposer's specs.
 {
 fileName: "essai.ics",
 contents: Assets.getText('essai.ics')
 //contents: "this is a test attachment."
 }
 ],
 text: "There's an attachment in this email. See the attachment."});
 */


// Global API configuration
var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});
//
// Generates: GET, POST, DELETE on /api/items and GET, PUT, DELETE on
// /api/items/:id for Items collection
Api.addCollection(Rooms);
Api.addCollection(Meetings);
Api.addCollection(Timeslots);

Api.addRoute('salles', {authRequired: false}, {
    get: function () {
        var salle = Rooms.findOne(this.urlParams.id);
        if (salle) {
            return {status: 'success', data: salle};
        }
        return {
            statusCode: 404,
            body: {status: 'fail', message: 'Post not found'}
        };
    },
    post: {
        //roleRequired: ['author', 'admin'],
        action: function () {
            var meetings;
            meetings = Agenda.getMeetingsFromAgenda(this.bodyParams.agenda);
            Agenda.roomsUpdate(this.bodyParams);

            //Logs.insert({date: moment().toDate(),desc: this.bodyParams.name + "  " + meetings.length});
            Agenda.meetingsUpdate(meetings, this.bodyParams.name, this.bodyParams.mail);
            // on met à jour le lastupdate ...
            Agenda.updateLastupdate ();

            return {status: "success", data: null};
        }
    },
    delete: {
        roleRequired: 'admin',
        action: function () {
            if (Posts.remove(this.urlParams.id)) {
                return {status: "success", data: {message: "Item removed"}};
            }
            return {
                statusCode: 404,
                body: {status: "fail", message: "Item not found"}
            };
        }
    }
});


Meteor.users.allow(
    {
        remove: function () {
            return true;
        }
    });

Api.addRoute('users', {authRequired: false}, {
    get: function () {
        var salle = Meteor.users.find({}, {fields: {emails: 1}}).fetch();
        if (salle) {
            return {status: 'success', data: salle};
        }
        return {
            statusCode: 404,
            body: {status: 'fail', message: 'Post not found'}
        };
    },
    delete: {
        action: function () {
            if (Meteor.users.remove({})) {
                return {status: "success", data: {message: "Item removed"}};
            }
            return {
                statusCode: 404,
                body: {status: "fail", message: "Item not found"}
            };
        }
    }
});
Router.map(function () {
    this.route('get-image', {
        where: 'server',
        path: '/icsfile',
        action: function () {
            console.log("meeting Id: " + this.request.query);

                    var meeting = Meetings.findOne({_id: this.request.query.id});
            if (!meeting) {
                return;
                console.log('no meeting found !');
            }
            var icsFile = constuctIcs(meeting);
            //this.response.writeHead(200, {'Content-type': 'image/png'}, this.request.query.file);
            //this.response.writeHead(200, {'Content-type': 'text/Calendar'}, this.request.query.name);
            //this.response.end("toto");
            // this.response.end(fs.readFileSync(uploadPath + this.request.query.name));

            this.response.writeHead(200, {
                "Content-Type": "text/Calendar",
                "Content-Disposition": "inline; filename=" + this.request.query.id + ".ics"
            });
            this.response.end(icsFile.file);
            /*
            return [200,
                {
                    'Content-type': 'text/Calendar',
                    'Content-Disposition': "attachment; filename=" + this.request.query.file
                }, Assets.getText('short.ics')
                ];
            */
            //this.next;
        }
    });
});


console.log(' -- ' +   moment().format('YYYYMMDD HH:mm:ss') );
