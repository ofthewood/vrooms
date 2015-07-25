App.accessRule('http://192.168.1.25:3000/*');
App.info({
    // the bundle ID must be unique across the entire app store
    // usually reverse domains of the creators are used
    id: 'technopole.vrooms',
    version: '1.0.0',
    description: 'reservation de salle au Technopole Bouyguestelecom',
    author: 'Vincent Dubois',
    email: 'vdubois@bouyguestelecom.fr',
    website: 'http://www.votresuivi.fr'
});

App.icons({
    // iOS
    'iphone': 'public/iOS/Resources/icons/Icon-60.png',
    // Android
    'android_ldpi': 'public/Android/res/drawable-ldpi/icon.png'
});

App.launchScreens({
    // iOS
    'iphone': 'public/iOS/Resources/splash/Default~iphone.png',
    // Android
    'android_ldpi_portrait': 'public/Android/res/drawable-ldpi/screen.png'
});