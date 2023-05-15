
<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRow,
    IonCol,
    IonButtons,
    IonBackButton,
    IonButton
} from "@ionic/vue";

import { ScheduleOptions, LocalNotifications, PermissionStatus, Schedule, Weekday, ScheduleEvery } from '@capacitor/local-notifications'


const setNotification = async () => {

    console.log('Notification set')
    const permission = await LocalNotifications.checkPermissions() as PermissionStatus

    if (permission.display === `denied`) {
        console.log('Notificatio denied')
        await LocalNotifications.requestPermissions()
    }


    const date = new Date()


    const schedule: Schedule = {
        at: undefined, // Schedule a notification at a specific date and time.  type: Date
        repeats: false, // Repeat delivery of this notification at the date and time specified by at. Only available for iOS and Android.
        on: {
            year: undefined,
            month: undefined,
            day: undefined,
            //weekday: Weekday.Friday,
            hour: undefined,
            minute: undefined,
            second: undefined
        },            // Schedule a notification on particular interval(s). This is similar to scheduling cron jobs. Only available for iOS and Android.
        every: undefined,   //'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'
        count: 0 //Limit the number times a notification is delivered by the interval specified by every.
    }

    const notification: ScheduleOptions = {
        notifications: [{
            title: 'Medicamento X',
            body: `Este medicamento es del doctor Rafa`,
            id: 100,
            //schedule: schedule,
            autoCancel: true
        }]
    }


    await LocalNotifications.schedule(notification)



}





const appStore = useAppStore()
</script>
  

  

<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title slot="start">{{ $t('text.alarme') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-row>
                <ion-col>
                    <ion-button @click="setNotification()">Set Notificacion</ion-button>
                </ion-col>
            </ion-row>

        </ion-content>
    </ion-page>
</template>


<style scoped></style>

