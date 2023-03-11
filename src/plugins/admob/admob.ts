import { AdMob } from '@capacitor-community/admob';
import { modalController } from '@ionic/vue';
import trackingAuthorization from '@/components/modal/trackingAuthorization.vue'




export async function createAdmob(): Promise<void> {
    const { status } = await AdMob.trackingAuthorizationStatus();


    let requestTrackingAuthorization = true

    if (status === 'notDetermined') {
        const modal = await modalController.create({
            component: trackingAuthorization,
        });
        modal.present();

        const { role } = await modal.onWillDismiss();

        if (role === 'cancel') {
            requestTrackingAuthorization = false
        }

    }

    AdMob.initialize({
        requestTrackingAuthorization,
        testingDevices: ['0AB2A271B52071FC5E495976E341AFD0'],
        initializeForTesting: false,
    });
}