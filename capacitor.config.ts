import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'con.iplast.app', //com.iplast.app
    appName: 'Iplast',
    webDir: 'dist',
    bundledWebRuntime: false,
    plugins: {
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            backgroundColor: "#ffffffff",
            androidSplashResourceName: "splash",
            androidScaleType: "CENTER_CROP",
            showSpinner: true,
            androidSpinnerStyle: "large",
            iosSpinnerStyle: "small",
            spinnerColor: "#999999",
            splashFullScreen: true,
            splashImmersive: true,
            layoutName: "launch_screen",
            useDialog: true,
        },
        GoogleAuth: {
            scopes: ['profile', 'email'],
            serverClientId: '569850281847-13cidt4oadktui1867icp9revreoc4ql.apps.googleusercontent.com',
            forceCodeForRefreshToken: true,
            clientId: '569850281847-7ibc3mppdklt0dia1hpksojt6bae17k5.apps.googleusercontent.com',
            iosClientId: '569850281847-6fsj7vkjohgl9kpcqbqa8mvuam5fsm9j.apps.googleusercontent.com'
        },
        LocalNotifications: {
            "iconColor": "#488AFF",
        }
    },
    server: { "allowNavigation": ["https://manuelbelen.com/dev/wp-json/wp/v2/posts"] }
};

export default config;
