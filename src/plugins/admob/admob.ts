import { AdMob } from '@capacitor-community/admob';

export async function createAdmob(): Promise<void> {
    const { status } = await AdMob.trackingAuthorizationStatus();

    console.log(status)

    AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['0AB2A271B52071FC5E495976E341AFD0'],
        initializeForTesting: false,
    });
}