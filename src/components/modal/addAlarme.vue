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
    IonModal,
    IonDatetime,
    IonTextarea,
    IonChip,
    IonAvatar,
    IonCard,
    IonCardContent,
    IonInput,
    IonSelect,
    IonSelectOption
} from "@ionic/vue";

import { useAppStore } from '@/store/app';
import { useAlarmeStore } from '@/store/alarme';
import { iAlarme } from '@/interfaces/iAlarme';
import alarmeType from '@/enums/alarmeType';
import alarmeCategory from '@/enums/alarmeCategory';
import { loadingController } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { getDate } from '@/ts/gatDate';
// Weekday
import { Weekday, ScheduleEvery } from '@/interfaces/iAlarme';

const { t } = useI18n()

const alarmeStore = useAlarmeStore()
const appStore = useAppStore()


//Objeto Alarma
const alarme = ref<iAlarme>({
    id: 1000,
    name: '',
    type: alarmeType.specific,
    active: true,
    body: '',
    at: getDate(),
    alarmeCategory: alarmeCategory.medicine,
    repeat: false,
    color: '#357fb7'
})

//Dia de la semana

const cadaSelect = ref<ScheduleEvery>('hour')
const cada = ['year', 'month', 'two-weeks', 'week', 'day', 'hour', 'minute', 'second'].reverse()
const cont = ref<string>()

// const week = [1, 2, 3, 4, 5, 6, 7]
// const dayWeeksSelect = ref<Weekday | undefined>(undefined)


//Guardar Alarma
const saveAlarme = async (alarmeIn: iAlarme) => {

    //Agregar Repetir y tipo de repeticion
    if (alarmeIn.repeat) {
        alarmeIn.every = cadaSelect.value

        if (cont.value)
            alarmeIn.count = parseInt(cont.value)
    }

    const loading = await loadingController.create({
        message: t('account.loading')
    })

    try {

        loading.present()
        await alarmeStore.setAlarme(alarmeIn)
        alarmeStore.addModalAlame = false
        await alarmeStore.getAlarmes()

        alarme.value.body = ''
        alarme.value.at = getDate()
        await loading.dismiss()

    } catch (error: any) {
        loading.dismiss()
        alarmeStore.addModalAlame = false
    }
}

</script>

<template>
    <ion-modal :is-open="alarmeStore.addModalAlame">
        <ion-header>
            <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
                <ion-buttons slot="start">
                    <ion-button @click="alarmeStore.addModalAlame = !alarmeStore.addModalAlame">{{ $t('account.cancel')
                    }}</ion-button>
                </ion-buttons>
                <ion-title class=" ion-text-center">{{ $t('text.alarme') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="saveAlarme(alarme)">{{ $t('account.confirm')
                    }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

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
                    <ion-datetime size="cover" :min="getDate()" hourCycle="h12" :value="getDate()" v-model="alarme.at">
                        <span slot="time-label">{{ $t('text.hour') }}</span>
                    </ion-datetime>
                </ion-card>

                <ion-item class="ion-margin " mode="ios">
                    <ion-label>
                        <h2>{{ $t('text.repeatAlarm') }}</h2>
                    </ion-label>
                    <ion-toggle mode="ios" v-model="alarme.repeat" :checked="alarme.repeat"></ion-toggle>
                </ion-item>

                <ion-item v-if="alarme.repeat" class="ion-margin " mode="ios">
                    <ion-row>
                        <!-- <ion-col size="12" class=" ion-margin-top ion-margin-bottom">
                            <ion-buttons>
                                <ion-button
                                    :style="dayWeeksSelect == weeday ? `border-bottom: 2px solid var(--ion-color-dark)` : null"
                                    @click="dayWeeksSelect = weeday" fill="outline" v-for="weeday in week" size="large">
                                    {{
                                        $t(`text.weekday.${Weekday[weeday]}`).substring(0, 2)
                                    }}</ion-button>
                            </ion-buttons>
                        </ion-col> -->

                        <ion-col size="6">
                            <ion-input v-model="cont"
                                style="font-size: 24px;border-bottom: 1px solid var(--ion-color-primary);"
                                :label="$t(`text.frequencyC`)" placeholder="#0" type="number"></ion-input>
                        </ion-col>
                        <ion-col size="6" class=" ion-margin-bottom">
                            <ion-select style="font-size: 24px;" interface="popover" v-model="cadaSelect"
                                :placeholder="$t(`text.cada.${cada[2]}`)">
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
    </ion-modal>
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