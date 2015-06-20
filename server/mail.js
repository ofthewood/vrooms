//https://www.exchangecore.com/blog/sending-outlookemail-calendar-events-php/
//$headers .= "Content-class: urn:content-classes:calendarmessage\n";
// http://sharepoint.stackexchange.com/questions/119698/how-to-send-meeting-request-to-user-from-sharepoint

Meteor.methods({

    sendMeetingMailo: function (id, userMail) {
        var meeting = Meetings.findOne({_id: id});
        if (!meeting) {
            return;
        }
        var icsFile = constuctIcs(meeting);

        var disposition = "inline; filename=" + icsFile.meetingId + ".ics";
        var options = {
            to: "vdubois@bouyguestelecom.fr",
            from: "noreply@votresuivi.fr",
            subject: "" + meeting.name + " " + meeting.debut,
            headers: {
                'Content-Type': "text/calendar; charset=utf-8;",
                'Content-Disposition': disposition
            },
            text: icsFile.file
            //html: Assets.getText('mail.html')
        };

        EmailAtt.send(options);

    },
    sendMeetingMail1: function () {
        var options = {
            to: "vdubois@bouyguestelecom.fr",
            from: "noreply@votresuivi.fr",
            subject: "Test attachment",
            headers: {

                "Content-Type": "text/calendar; method=REQUEST"
            },
            text: "hello"
            //html: Assets.getText('mail.html')
        };

        Email.send(options);

    },
    sendMeetingMail: function (id, userMail) {
        var meeting = Meetings.findOne({_id: id});
        if (!meeting) {
            return;
        }
        var icsFile = constuctIcs(meeting);
        var options = {
            to: userMail,
            from: "noreply@votresuivi.fr",
            subject: moment(meeting.debut).format('ddd LLL') + " " + meeting.name,
            headers: {},
            attachmentOptions: [
                // Each attachment conforms to mailcomposer's specs.
                {
                    fileName: icsFile.meetingId + ".ics",
                    contentType: "text/calendar;",
                    contents: icsFile.file
                    //contents: "this is a test attachment."
                }
            ],
            text: "Parce que trouver une salle, c'est compliqué"
        };

        EmailAtt.send(options);

        return "some return value";
    },
    sendFeedbackMail: function (content, userMail) {
        var options = {
            to: "vdubois@bouyguestelecom.fr",
            from: "noreply@votresuivi.fr",
            subject: "[Vrooms FD] " + content.substring(0, 20),
            text: content + '\n' + userMail
        };
        Email.send(options);
        return;
    }
});

constuctIcs = function (meeting) {

    // on construit le vCalendar ...
    var vCalendar = Assets.getText('short.ics');
    // on l'insère et basta ...

    var meetingId = md5(uniqid('', true));
    vCalendar = vCalendar.replace(/#meetingId/g, meetingId);

    var debut = moment(meeting.debut).format('YYYYMMDDTHHmmss');
    vCalendar = vCalendar.replace(/#debut/g, debut);

    var fin = moment(meeting.debut).add(1, 'hours').format('YYYYMMDDTHHmmss');
    vCalendar = vCalendar.replace(/#fin/g, fin);

    vCalendar = vCalendar.replace(/#nomSalle/g, meeting.name);
    vCalendar = vCalendar.replace(/#mailSalle/g, meeting.mail);

    vCalendar = vCalendar.replace(/#userMail/g, "vdubois@bouyguestelecom.fr");

    return {file: vCalendar, meetingId: meetingId}
}