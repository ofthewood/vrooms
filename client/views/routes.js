Router.configure({
    loadingTemplate: 'loading'
})


Router.map(function () {
    this.route('home', {
        path: '/',
        layoutTemplate: 'layout',
        template: 'timeslots',
        waitOn: function () {
            return Meteor.subscribe('Timeslots');
        },
        onAfterAction: function () {
            if (typeof ga !== 'undefined') {
                GAnalytics.pageview();
            }
        }
    });
    this.route('roomsList', {
        path: '/roomslist',
        layoutTemplate: 'layout',
        template: 'roomsList',
        waitOn: function () {
            return Meteor.subscribe('Timeslots');
        },
        onAfterAction: function () {
            if (typeof ga !== 'undefined') {
                GAnalytics.pageview();
            }
        }
    });
    this.route('inspinia', {
        path: '/inspinia',
        template: 'inspinia'
    });
    this.route('meetings', {
        path: '/meetings',
        template: 'meetingsList'
    });
    this.route('lastdispo', {
        path: '/lastdispo',
        template: 'lastFreeMeetings',
        layoutTemplate: 'layout',
        waitOn: function () {
            //return Meteor.subscribe('Timeslots');
        },
        onAfterAction: function () {
            if (typeof ga !== 'undefined') {
                GAnalytics.pageview();
            }
        }
    });
    this.route('timeslots', {
        path: '/timeslots',
        template: 'timeslots',
        waitOn: function () {
            return Meteor.subscribe('Timeslots');
        }
    });
});

