App.accessRule('*');

if (this.process.env.NODE_ENV === 'production') {
    App.info({
        // the bundle ID must be unique across the entire app store
        // usually reverse domains of the creators are used
        id: 'technopole.rooms',
        name: 'leTech',
        version: '1.0.1',
        description: 'reservation de salle au Technopole Bouyguestelecom',
        author: 'Vincent Dubois',
        email: 'vdubois@bouyguestelecom.fr',
        website: 'http://www.votresuivi.fr'
    });

}
else {
    App.info({
        // the bundle ID must be unique across the entire app store
        // usually reverse domains of the creators are used
        id: 'technopole.roomsDev',
        name: 'leTechDev',
        version: '1.0.1',
        description: 'reservation de salle au Technopole Bouyguestelecom',
        author: 'Vincent Dubois',
        email: 'vdubois@bouyguestelecom.fr',
        website: 'http://www.votresuivi.info'
    });

}

App.icons({

    // iOS
    'iphone':       'public/ressources/icons/ios/icon-60.png',
    'iphone_2x':    'public/ressources/icons/ios/icon-60@2x.png',
    'iphone_3x':    'public/ressources/icons/ios/icon-60@3x.png',
    'ipad':         'public/ressources/icons/ios/icon-76.png',
    'ipad_2x':      'public/ressources/icons/ios/icon-76@2x.png',

    // Android
    'android_hdpi': 'public/ressources/icons/android/icon-72-hdpi.png',
    'android_ldpi': 'public/ressources/icons/android/icon-36-ldpi.png',
    'android_mdpi': 'public/ressources/icons/android/icon-48-mdpi.png',
    'android_xhdpi': 'public/ressources/icons/android/icon-96-xhdpi.png'


});

App.launchScreens({

    // iOS
    'iphone':               'public/ressources/splash/ios/splash-320x480.png',
    'iphone_2x':            'public/ressources/splash/ios/splash-320x480@2x.png',
    'iphone5':              'public/ressources/splash/ios/splash-320x568@2x.png',
    'iphone6':              'public/ressources/splash/ios/splash-375x667@2x.png',
    'iphone6p_portrait':    'public/ressources/splash/ios/splash-414x736@3x.png',
    'iphone6p_landscape':   'public/ressources/splash/ios/splash-736x414@3x.png',

    'ipad_portrait':        'public/ressources/splash/ios/splash-768x1024.png',
    'ipad_portrait_2x':     'public/ressources/splash/ios/splash-768x1024@2x.png',
    'ipad_landscape':       'public/ressources/splash/ios/splash-1024x768.png',
    'ipad_landscape_2x':    'public/ressources/splash/ios/splash-1024x768@2x.png',

    // Android
    'android_ldpi_portrait':    'public/ressources/splash/android/splash-200x320.png',
    'android_ldpi_landscape':   'public/ressources/splash/android/splash-320x200.png',
    'android_mdpi_portrait':    'public/ressources/splash/android/splash-320x480.png',
    'android_mdpi_landscape':   'public/ressources/splash/android/splash-480x320.png',
    'android_hdpi_portrait':    'public/ressources/splash/android/splash-480x800.png',
    'android_hdpi_landscape':   'public/ressources/splash/android/splash-800x480.png',
    'android_xhdpi_portrait':   'public/ressources/splash/android/splash-720x1280.png',
    'android_xhdpi_landscape':  'public/ressources/splash/android/splash-1280x720.png'


});
