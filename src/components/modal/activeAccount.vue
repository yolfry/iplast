<script lang="ts" setup>

import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonText,
    IonInput,
    modalController,
    alertController,
    loadingController,
    IonIcon,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent
} from '@ionic/vue';
import { lockOpenOutline } from 'ionicons/icons';

import { useAccountStore } from '@/store/account';

import { useI18n } from "vue-i18n";
import openAlert from "@/ts/openAlert";
import regExps from "@/ts/RegExps";
const { t } = useI18n();




const account = useAccountStore()


const cancel = async () => {

    const alert = await alertController.create({
        header: "Alert",
        message: t("account.logoutCode"),
        buttons: [
            {
                text: t('text.no'),
                role: "cancel",
                handler: () => {
                    console.log('cancel')
                }
            },
            {
                text: t('text.yes'),
                handler: async () => {
                    return modalController.dismiss(null, 'cancel');
                }
            }
        ]
    });

    alert.present();
}

const confirm = async () => {

    const loading = await loadingController.create({
        message: t("account.loading"),
        translucent: true,
    });

    try {

        if (!account.user.code) {
            throw new Error(await openAlert('account.incorrectCode', t, alertController));
        }
        if (!regExps.code.exec(account.user.code)) {
            throw new Error(await openAlert('account.incorrectCode', t, alertController));
        }

        if (!account.user.email || !regExps.email.exec(account.user.email)) {
            throw new Error(await openAlert('account.emailError', t, alertController));
        }

        loading.present();
        const res = await account.activeAccount()

        if (!res) {
            throw new Error(await openAlert('account.errorApp', t, alertController))
        }

        if (res.status === 400) {
            throw new Error(await openAlert('account.setCodeRecoveryError', t, alertController))
        }

        if (res.status === 401) {
            throw new Error(await openAlert('account.setCodeRecoveryError', t, alertController))
        }

        if (res.status === 404) {
            account.user.code = undefined
            throw new Error(await openAlert('account.incorrectCode', t, alertController))
        }

        if (res.status === 403) {
            throw new Error(await openAlert('account.error403', t, alertController))
        }

        if (res.status === 500) {
            throw new Error(await openAlert('account.errorServer', t, alertController))
        }

        if (res.status === 200 || res.status === 201) {
            loading.dismiss();
            return modalController.dismiss(res, 'confirm');
        } else {
            throw new Error(await openAlert('account.errorApp', t, alertController))
        }
    } catch (error) {
        console.log(error);
        loading.dismiss();
    }

}


</script>

<template>
    <ion-header :translucent="true">
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">{{ $t('account.cancel') }}</ion-button>
            </ion-buttons>
            <ion-title>{{ $t('account.activateAccount') }}</ion-title>
            <ion-buttons slot="end">
                <ion-button color="tertiary" @click="confirm">
                    <ion-icon :icon="lockOpenOutline"></ion-icon> {{ $t('account.confirm') }}
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-row>
            <ion-col size="12">
                <ion-card mode="ios">
                    <ion-card-content>
                        <ion-text class=" ion-text-center">
                            <h2>{{ $t('account.messageCodeSent') }}</h2>
                            <h3>{{ account.user.email }}</h3>
                        </ion-text>
                    </ion-card-content>
                    <ion-input class="ion-text-center" v-model="account.user.code" inputmode="numeric" type="number"
                        :placeholder="$t('account.placeholder.code')"></ion-input>
                </ion-card>

            </ion-col>
        </ion-row>
    </ion-content>
</template>


<style scoped>
ion-row {
    margin-top: 50%;
}


ion-input {
    --padding-top: 20px;
    --padding-start: 10px;
    --padding-bottom: 20px;
    font-size: 30px;
    border: 0.1px solid var(--ion-color-primary);
    border-radius: 10px;
}
</style>
  
