<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('account.changePassword') }}</ion-title>
                <ion-buttons slot="primary">
                    <ion-text class="ion-padding-end" @click="changePassword()">
                        <h5>{{ $t('user.save') }}</h5>
                    </ion-text>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" color="tertiary">
            <!-- <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $t('titles.config') }}</ion-title>
                </ion-toolbar>
            </ion-header> -->

            <ion-item-group class=" ion-padding">
                <ion-item>
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.newPassword') }}
                    </ion-label>
                    <ion-input v-model="userPassword.newPassword" type="password"
                        :placeholder="$t('account.placeholder.newPassword')">
                    </ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.confirmePassword') }}
                    </ion-label>
                    <ion-input v-model="userPassword.confirmeNewPassword" type="password"
                        :placeholder="$t('account.placeholder.confirmePassword')">
                    </ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.removeSections') }}
                    </ion-label>
                    <ion-toggle v-model="accountStore.user.removeSections"></ion-toggle>
                </ion-item>


            </ion-item-group>

        </ion-content>

    </ion-page>
</template>


<script lang="ts" setup>
import {
    IonItemGroup, IonButtons, IonBackButton, IonIcon, IonTitle, IonToolbar, IonItem, IonHeader, IonContent, IonText, IonPage, IonLabel, IonInput, IonAvatar, IonRow, IonCol, IonDatetime,
    IonDatetimeButton, IonModal, IonItemDivider, IonToggle
} from '@ionic/vue';
import openAlert from '@/ts/openAlert';
import { alertController, loadingController, useIonRouter } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { createOutline, settingsSharp, linkOutline } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';
import RegExps from "@/ts/RegExps";
// import { useAppStore } from '@/store/app';

const accountStore = useAccountStore();

const { t } = useI18n()


const router = useIonRouter()

const userPassword = ref({
    newPassword: undefined,
    confirmeNewPassword: undefined,

})

onMounted(() => {
    // useAppStore().getDataApp('userAll')
})


const changePassword = async () => {

    const loading = await loadingController.create({
        message: t("account.loading"),
        translucent: true,
    });


    try {

        accountStore.user.newPassword = userPassword.value.newPassword

        if (!accountStore.user.newPassword || !RegExps.password.exec(accountStore.user.newPassword)) {
            throw new Error(await openAlert('account.incorrectPassword', t, alertController))
        }

        if (accountStore.user.newPassword != userPassword.value.confirmeNewPassword) {
            throw new Error(await openAlert('account.passwordConfirmeError', t, alertController))
        }

        await loading.present();
        // accountStore.userAll = { ...userPassword.value }
        const res = await accountStore.changePasswordUser()

        if (!res) {
            throw new Error(await openAlert('account.errorApp', t, alertController))
        }

        if (res.status === 400) {
            // account.cleanUser() //Si el usuario existe, borramos los datos del formulario
            throw new Error(await openAlert('account.updateError', t, alertController))
        }

        if (res.status === 401) {
            // account.cleanUser(); //Si el usuario existe, borramos los datos del formulario
            throw new Error(await openAlert('account.updateError', t, alertController))
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
            //Ir a cuenta, Luego de que el usuario se registre

            if (accountStore.user.removeSections) {
                await accountStore.cleanUser()
                router.push('/tabs/login')
            } else {
                router.back()
            }

            //Remove Password TMP
            userPassword.value.confirmeNewPassword = undefined
            userPassword.value.newPassword = undefined

            loading.dismiss();
        } else {
            throw new Error(await openAlert('account.errorApp', t, alertController))
        }

    } catch (error) {
        loading.dismiss();
    }


}

</script>