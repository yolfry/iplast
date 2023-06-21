<script lang="ts" setup>
import { IonButton, IonIcon, IonCol, IonRow, useIonRouter } from '@ionic/vue';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { alertController, loadingController } from "@ionic/vue";
import { onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import { useAccountStore } from '@/store/account';
import openAlert from "@/ts/openAlert";


const { t } = useI18n();
const account = useAccountStore()
const ionRouter = useIonRouter()


const validate = async (res: any) => {

    //Ocurrio un error en la aplicacion
    if (!res) {
        throw new Error(await openAlert('account.errorApp', t, alertController))
    }

    if (res.status === 400) {
        throw new Error(await openAlert('account.errorUser', t, alertController))
    }

    if (res.status === 401) {
        throw new Error(await openAlert('account.errorUser', t, alertController))
    }

    if (res.status === 404) {
        throw new Error(await openAlert('account.error404', t, alertController))
    }

    if (res.status === 403) {
        throw new Error(await openAlert('account.error403', t, alertController))
    }

    if (res.status === 500) {
        throw new Error(await openAlert('account.errorServer', t, alertController))
    }

    if (res.status === 200 || res.status === 201) {
        ionRouter.push('/tabs/mycuenta')

    } else {
        throw new Error(await openAlert('account.errorApp', t, alertController))
    }

}


const googleLogin = async (id_token: string) => {
    const loading = await loadingController.create({
        cssClass: 'my-custom-class',
        message: t('account.loading')
    });


    //Add id_token user 
    if (!id_token) {
        throw new Error(await openAlert('account.errorApp', t, alertController))
    }


    try {
        await loading.present()
        const res = await account.googleLogin(id_token)

        await validate(res)


        await loading.dismiss()

    } catch (error) {
        loading.dismiss()
        console.log(error);
    }
}


const facebookLogin = async (token: string) => {
    const loading = await loadingController.create({
        cssClass: 'my-custom-class',
        message: t('account.loading')
    });


    //Add id_token user 
    if (!token) {
        throw new Error(await openAlert('account.errorApp', t, alertController))
    }

    try {
        await loading.present()
        const res = await account.facebookLogin(token)

        await validate(res)

        await loading.dismiss()

    } catch (error) {
        loading.dismiss()
        console.log(error);
    }
}


onMounted(() => {
    // use hook after platform dom ready
    GoogleAuth.initialize({
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
        clientId: '569850281847-7ibc3mppdklt0dia1hpksojt6bae17k5.apps.googleusercontent.com',
    });

    //Facebook Login
    FacebookLogin.initialize({ appId: '935267257712945' });

})


const googleAuth = async () => {
    const resul = await GoogleAuth.signIn()
    await googleLogin(resul.authentication.accessToken)
}


const facebookAuth = async () => {

    const FACEBOOK_PERMISSIONS = [
        'email',
        // 'user_birthday',
        // 'user_photos',
        // 'user_gender',
    ];

    const result: FacebookLoginResponse = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

    if (result.accessToken?.token) {
        await facebookLogin(result.accessToken?.token)
    } else {
        await openAlert('account.errorApp', t, alertController)
    }

}

</script>


<template>
    <ion-row>
        <ion-col class="ion-text-center">

            <ion-button @click="googleAuth()" shape="round" style="--background:#db3236;" size="default">
                <ion-icon slot="start" :icon="logoGoogle" size="large"></ion-icon> {{ $t('text.sigGoogle') }}
            </ion-button>

            <ion-button @click="facebookAuth()" shape="round" style="--background: #4267B2;" size="default">
                <ion-icon slot="start" :icon="logoFacebook" size="large"></ion-icon>{{ $t('text.sigFacebook') }}
            </ion-button>

        </ion-col>
    </ion-row>
</template>


<style scoped></style>