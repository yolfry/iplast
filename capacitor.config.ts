import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'con.iplast.app',
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
    },
    server: { "allowNavigation": ["https://manuelbelen.com/dev/wp-json/wp/v2/posts"] }
};

export default config;
