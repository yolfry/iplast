
<script lang="ts" setup>

import { ref } from 'vue'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRow,
    IonCol,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonToggle,
    IonDatetime,
    IonTextarea,
    IonChip,
    IonAvatar,
    IonCard,
    IonCardContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonRefresher,
    IonRefresherContent,
    IonBackButton,
    IonPage,
    useIonRouter
} from "@ionic/vue";

import { useAppStore } from '@/store/app';
import { useAlarmeStore } from '@/store/alarme';
import { iAlarme } from '@/interfaces/iAlarme';
import alarmeType from '@/enums/alarmeType';
import alarmeCategory from '@/enums/alarmeCategory';
import { loadingController } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { parseISOString } from '@/ts/parseISOString';

// Weekday
import { Weekday, ScheduleEvery } from '@/interfaces/iAlarme';


const { t } = useI18n()
const router = useIonRouter()
const alarmeStore = useAlarmeStore()
const appStore = useAppStore()


//Fecha actual del sistema
const date = ref<Date>(new Date)

//Fecha en tiempo real
setInterval(() => {
    date.value = new Date()
}, 1000)


//Objeto Alarma
const alarme = ref<iAlarme>({
    id: 1000,
    name: '',
    type: alarmeType.specific,
    active: true,
    body: '',
    at: parseISOString(date.value),
    alarmeCategory: alarmeCategory.medicine,
    repeat: false,
    color: '#357fb7',
    weekday: undefined,
    count: 1
})




//Dia de la semana
const cadaSelect = ref<ScheduleEvery>('hour')
const cada = ['year', 'month', 'two-weeks', 'week', 'day', 'hour', 'minute', 'second'].reverse()
const week = [1, 2, 3, 4, 5, 6, 7]


//Guardar Alarma
const saveAlarme = async (alarmeIn: iAlarme) => {



    //Agregar Repetir y tipo de repeticion
    if (alarmeIn.repeat) {

        if (cadaSelect.value) {
            alarmeIn.every = cadaSelect.value
        }
        if (alarmeIn.count) {
            alarmeIn.count = parseInt(alarmeIn.count.toString())
        }

    }

    console.log(alarmeIn)

    const loading = await loadingController.create({
        message: t('account.loading')
    })

    try {

        loading.present()
        await alarmeStore.setAlarme(alarmeIn)
        await alarmeStore.getAlarmes()

        alarme.value.body = ''
        alarme.value.at = parseISOString(date.value)
        await loading.dismiss()

        router.push('/tabs/alarme')

    } catch (error: any) {
        loading.dismiss()
    }
}


const doRefresh = async (e: any) => {
    try {
        await alarmeStore.getAlarmes()

        alarme.value.body = ''
        alarme.value.repeat = false
        alarme.value.color = undefined
        cadaSelect.value = 'hour'



        e.target.complete()


    } catch (error) {
        e.target.complete()
    }
}



</script>
  

<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
                <ion-buttons slot="start">
                    <ion-back-button ref="/tabs/alarme" defaultHref="/tabs/alarme"></ion-back-button>
                </ion-buttons>

                <ion-title class=" ion-text-center">{{ $t('text.alarme') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="saveAlarme(alarme)">{{ $t('account.confirm')
                    }}</ion-button>
                </ion-buttons>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">


            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>


            <ion-row>
                <ion-col class=" ion-padding">
                    <ion-chip :class="alarme.alarmeCategory == category ? 'select' : 'no-select'"
                        @click="alarme.alarmeCategory = category" v-for="category in alarmeCategory">
                        <ion-avatar>
                            <img style="background-color:var(--ion-icon-background-color);"
                                :src="`/assets/icon_${category}.png`" />
                        </ion-avatar>

                        <ion-label class="ion-text-wrap">{{ $t(`text.alarmeCategory.${category}`) }}
                        </ion-label>
                    </ion-chip>
                </ion-col>
            </ion-row>

            <ion-card mode="ios">
                <ion-card-content>
                    <ion-label>
                        <h2>{{ $t('text.alarmeName') }}</h2>
                    </ion-label>
                    <ion-textarea v-model="alarme.body" :placeholder="$t(`text.alarme`)"></ion-textarea>
                </ion-card-content>
            </ion-card>

            <!--Type Meical-->
            <template v-if="alarme.type == alarmeType.specific">
                <ion-card mode="ios">
                    <ion-datetime :disabled="alarme.repeat" size="cover" presentation="date" :min="parseISOString(date)"
                        :value="parseISOString(date)" v-model="alarme.at">
                    </ion-datetime>
                </ion-card>


                <ion-item class="ion-margin" mode="ios">
                    <ion-label slot="start">
                        <h2>{{ $t('text.hour') }}</h2>
                    </ion-label>
                </ion-item>


                <ion-card mode="ios">
                    <ion-card-content>
                        <ion-datetime color="warning" slot="start"
                            :disabled="alarme.weekday ? false : true && alarme.repeat" :value="parseISOString(date)"
                            class=" ion-margin ion-margin-start" hourCycle="h12" v-model="alarme.at"
                            presentation="time"></ion-datetime>
                    </ion-card-content>
                </ion-card>






                <ion-item class="ion-margin " mode="ios">
                    <ion-label>
                        <h2>{{ $t('text.repeatAlarm') }}</h2>
                    </ion-label>
                    <ion-toggle mode="ios" v-model="alarme.repeat" :checked="alarme.repeat"></ion-toggle>
                </ion-item>

                <ion-item v-if="alarme.repeat" class="ion-margin " mode="ios">
                    <ion-row>
                        <ion-col size="12" class=" ion-margin-top ion-margin-bottom">
                            <ion-buttons>
                                <ion-button
                                    :style="alarme.weekday == weeday ? `border-bottom: 2px solid var(--ion-color-dark)` : null"
                                    @click="() => {
                                        if (alarme.weekday == weeday) {
                                            alarme.weekday = undefined
                                        } else {
                                            alarme.weekday = weeday
                                        }

                                    }" fill="outline" v-for="weeday in week" size="large">
                                    {{
                                        $t(`text.weekday.${Weekday[weeday]}`).substring(0, 2)
                                    }}</ion-button>
                            </ion-buttons>
                        </ion-col>

                        <ion-col size="6">
                            <ion-input :disabled="alarme.weekday ? true : false" v-model="alarme.count"
                                style="font-size: 24px;border-bottom: 1px solid var(--ion-color-primary);"
                                :label="$t(`text.frequencyC`)" placeholder="1" type="number"></ion-input>
                        </ion-col>
                        <ion-col size="6" class=" ion-margin-bottom">
                            <ion-select :disabled="alarme.weekday ? true : false" style="font-size: 24px;"
                                interface="popover" v-model="cadaSelect" :placeholder="$t(`text.cada.${cada[2]}`)">
                                <ion-select-option :value="cd" v-for="cd in cada">{{ $t(`text.cada.${cd}`)
                                }}</ion-select-option>
                            </ion-select>
                        </ion-col>

                    </ion-row>
                </ion-item>

                <ion-item class="ion-margin" mode="ios">
                    <ion-label>
                        <h2>{{ $t('text.color') }}</h2>
                    </ion-label>
                    <input v-model="alarme.color" type="color" />
                </ion-item>


            </template>

        </ion-content>
    </ion-page>
</template>


<style scoped>
input[type='color'] {
    width: 3rem;
    height: 3rem;
    border: 0;
    background-color: #ffffff00;
}

.select {
    --background: #00213f;
    --color: #adefd1;
}
</style>

