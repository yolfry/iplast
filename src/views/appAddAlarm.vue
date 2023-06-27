
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
    useIonRouter,
    IonDatetimeButton,
    IonModal
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
const time = ref()


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
    alarmeCategory: alarmeCategory.reminder,
    repeat: false,
    color: '#357fb7',
    weekday: [],
    count: 1,
    options: {
        cita: {
            rememberBefore: false
        },
        reminder: {
            notify: null
        }
    }
})



//Dia de la semana
const cadaSelect = ref<ScheduleEvery>('hour')
const cada = ['month', 'week', 'day', 'hour'].reverse()
const week = [1, 2, 3, 4, 5, 6, 7]

const intervalNotifyType = ['weekly', 'monthly', 'annual']


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


            <!--Recordatorio o Alarma-->
            <template v-if="alarme.alarmeCategory == alarmeCategory.reminder">
                <ion-card mode="ios">
                    <ion-card-content>
                        <ion-label>
                            <h2>Detalle de la alarma</h2>
                        </ion-label>
                        <ion-textarea v-model="alarme.body" placeholder="Alarma"></ion-textarea>
                    </ion-card-content>
                </ion-card>

                <ion-item class="ion-margin" mode="ios">

                    <ion-label slot="start" position="fixed">
                        <h2>{{ $t('text.dateAndTime') }}</h2>
                    </ion-label>

                    <ion-datetime-button slot="start" v-model="alarme.at" :value="parseISOString(date)"
                        :min="parseISOString(date)" datetime="datetime"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime hourCycle="h12" id="datetime"></ion-datetime>
                    </ion-modal>
                </ion-item>

                <ion-item v-if="alarme.weekday?.length" class="ion-margin-horizontal">
                    <ion-label style="display:inline-flex;" mode="ios" position="stacked">
                        <h2 class="ion-text-wrap">Cada &nbsp;</h2>
                        <h2 :key="wee" v-for="wee in alarme.weekday"> {{
                            $t(`text.weekday.${Weekday[wee]}`).substring(0, 2)
                        }}, &nbsp;</h2>
                    </ion-label>
                </ion-item>
                <ion-item :disabled="alarme?.options?.reminder?.notify ? true : false" class="ion-margin-horizontal">
                    <ion-buttons>
                        <ion-button size="small"
                            :fill="alarme.weekday?.filter(wee => wee == weeday)[0] ? 'solid' : 'outline'" shape="round"
                            color="primary" @click="() => {
                                if (alarme.weekday?.filter(wee => wee == weeday)[0]) {

                                    // Remover del objeto
                                    alarme.weekday = alarme.weekday.filter(wee => wee != weeday)
                                } else {
                                    //Add Objeto
                                    alarme.weekday?.push(weeday)
                                }

                            }" v-for="weeday in week">
                            {{
                                $t(`text.weekday.${Weekday[weeday]}`).substring(0, 2)
                            }}</ion-button>
                    </ion-buttons>
                </ion-item>

                <ion-item :disabled="(alarme.weekday?.length) ? true : false" v-if="alarme?.options?.reminder"
                    class="ion-margin " mode="ios">
                    <ion-label>
                        <h2>Notificar</h2>
                    </ion-label>
                    <ion-select placeholder="No" v-model="alarme.options.reminder.notify" style="font-size: 24px;"
                        interface="popover">
                        <ion-select-option :value="null"></ion-select-option>
                        <ion-select-option :value="notify" v-for="notify in intervalNotifyType">{{ notify
                        }}</ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item class="ion-margin" mode="ios">
                    <ion-label>
                        <h2>{{ $t('text.color') }}</h2>
                    </ion-label>
                    <input v-model="alarme.color" type="color" />
                </ion-item>


            </template>

            <!--Formulario tipo Medicamento-->
            <template v-if="alarme.alarmeCategory == alarmeCategory.medicine">

                <ion-card mode="ios">
                    <ion-card-content>
                        <ion-label>
                            <h2>Detalle del edicamento</h2>
                        </ion-label>
                        <ion-textarea v-model="alarme.body" placeholder="Medicamento"></ion-textarea>
                    </ion-card-content>
                </ion-card>

                <ion-item :disabled="alarme.weekday ? false : true && alarme.repeat" class="ion-margin" mode="ios">

                    <ion-label slot="start" position="fixed">
                        <h2>{{ $t('text.dateAndTime') }}</h2>
                    </ion-label>

                    <ion-datetime-button slot="start" v-model="alarme.at" :value="parseISOString(date)"
                        :disabled="alarme.repeat" :min="parseISOString(date)" datetime="datetime"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime hourCycle="h12" id="datetime"></ion-datetime>
                    </ion-modal>

                </ion-item>

                <ion-item class="ion-margin " mode="ios">
                    <ion-label>
                        <h2>Repetir Medicamento</h2>
                    </ion-label>
                    <ion-toggle mode="ios" v-model="alarme.repeat" :checked="alarme.repeat"></ion-toggle>
                </ion-item>

                <ion-item v-if="alarme.repeat" class="ion-margin " mode="ios">

                    <ion-input v-if="cadaSelect != 'hour'" v-model="alarme.count"
                        style="font-size: 24px;border-bottom: 1px solid var(--ion-color-primary);"
                        :label="$t(`text.frequencyC`)" placeholder="1" type="number"></ion-input>

                    <ion-select slot="start" v-else style="font-size: 24px;" interface="popover" v-model="alarme.count"
                        :label="$t(`text.frequencyC`)" placeholder="6">
                        <ion-select-option :value="6">6</ion-select-option>
                        <ion-select-option :value="8">8</ion-select-option>
                        <ion-select-option :value="12">12</ion-select-option>
                        <ion-select-option :value="24">24</ion-select-option>
                    </ion-select>

                    <ion-select slot="end" style="font-size: 24px;" interface="popover" v-model="cadaSelect"
                        :placeholder="$t(`text.cada.${cada[2]}`)">
                        <ion-select-option :value="cd" v-for="cd in cada">{{ $t(`text.cada.${cd}`)
                        }}</ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item class="ion-margin" mode="ios">
                    <ion-label>
                        <h2>{{ $t('text.color') }}</h2>
                    </ion-label>
                    <input v-model="alarme.color" type="color" />
                </ion-item>

            </template>

            <!--Formulario tipo cita-->
            <template v-if="alarme.alarmeCategory == alarmeCategory.cita">

                <ion-card mode="ios">
                    <ion-card-content>
                        <ion-label>
                            <h2>Detalle de la Cita</h2>
                        </ion-label>
                        <ion-textarea v-model="alarme.body" placeholder="Cita"></ion-textarea>
                    </ion-card-content>
                </ion-card>

                <ion-item class="ion-margin" mode="ios">
                    <ion-label slot="start" position="fixed">
                        <h2>{{ $t('text.dateAndTime') }}</h2>
                    </ion-label>
                    <ion-datetime-button slot="start" v-model="alarme.at" :value="parseISOString(date)"
                        :min="parseISOString(date)" datetime="datetime"></ion-datetime-button>
                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime hourCycle="h12" id="datetime"></ion-datetime>
                    </ion-modal>
                </ion-item>

                <ion-item v-if="alarme.options?.cita" class="ion-margin " mode="ios">
                    <ion-label>
                        <h2>Recordar un dia antes</h2>
                    </ion-label>
                    <ion-toggle mode="ios" v-model="alarme.options.cita.rememberBefore"
                        :checked="alarme.repeat"></ion-toggle>
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

