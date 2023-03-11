<script lang="ts" setup>

import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonText,
    modalController,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent
} from '@ionic/vue';

import { useI18n } from "vue-i18n";
const { locale } = useI18n();



const cancel = async () => {
    return modalController.dismiss(null, 'cancel')
}

const confirm = async () => {
    return modalController.dismiss({}, 'confirm');
}


</script>

<template>
    <ion-header :translucent="true">
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">{{ $t('account.cancel') }}</ion-button>
            </ion-buttons>
            <ion-title v-if="locale == 'en'">Tracking</ion-title>
            <ion-title v-if="locale == 'es'">Seguimiento</ion-title>
            <ion-title v-if="locale == 'fr'">Suivi</ion-title>
            <ion-buttons slot="end">
                <ion-button color="tertiary" @click="confirm">
                    {{ $t('account.confirm') }}
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-row>
            <ion-col size="12">
                <ion-card mode="ios">
                    <ion-card-content>
                        <ion-text class=" ion-text-center" v-if="locale == 'en'">
                            We would like to track your data for advertising purposes, which will allow us to offer
                            personalized ads. Your information will be kept confidential and we will not share it with third
                            parties.
                        </ion-text>

                        <ion-text class=" ion-text-center" v-if="locale == 'es'">
                            Nos gustaría hacer un seguimiento de sus datos con fines publicitarios, lo que nos permitirá
                            ofrecer anuncios personalizados. Su información se mantendrá confidencial y no la compartiremos
                            con terceros.
                        </ion-text>

                        <ion-text class=" ion-text-center" v-if="locale == 'fr'">
                            Nous aimerions suivre vos données à des fins publicitaires, ce qui nous permettra de proposer
                            des annonces personnalisées. Vos informations seront gardées confidentielles et nous ne les
                            partagerons pas avec des tiers.
                        </ion-text>

                    </ion-card-content>


                </ion-card>

            </ion-col>
        </ion-row>
    </ion-content>
</template>


<style scoped>
ion-row {
    margin-top: 30%;
}
</style>
  
