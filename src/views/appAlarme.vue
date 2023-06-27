
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "@/store/app";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonRow,
    IonCol,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonText,
    IonRefresher,
    IonRefresherContent,
    IonDatetime,
    IonCard,
    DatetimeChangeEventDetail,
    IonFab,
    IonFabButton,
    alertController,
    useIonRouter
} from "@ionic/vue";
import { add, trash, alarm, qrCodeOutline, filterOutline } from "ionicons/icons";
import { useAlarmeStore } from "@/store/alarme";
import { loadingController } from "@ionic/vue";
import { useI18n } from "vue-i18n";
import shareEdit from "@/components/modal/shareEdit.vue";
import { startCodeScan } from "@/ts/codeScan";
import { iAlarme } from "@/interfaces/iAlarme";
import { IonDatetimeCustomEvent } from "@ionic/core";

const { t } = useI18n()

const router = useIonRouter()

const appStore = useAppStore()
const alarmeStore = useAlarmeStore()

const datatime = ref()

const isFilterDay = ref(true)
const isFilterMonth = ref(false)


onMounted(async () => {

    const loading = await loadingController.create({
        message: t('account.loading')
    })

    try {
        loading.present()
        await alarmeStore.getAlarmes()
        loading.dismiss()
        searchDate()
    } catch (error) {
        loading.dismiss()
    }

})

//Option Date
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12'
};


//Delete alarma
const removeAlarme = async (idAlarme: number) => {


    const alert = await alertController.create({
        header: t('text.delete.delete') + ' Alarm',
        message: t('text.delete.message'),
        buttons: [{
            text: t('text.delete.yes'),
            handler: async () => {

                const loading = await loadingController.create({
                    message: t('account.loading')
                })

                try {
                    loading.present()
                    await alarmeStore.delete(idAlarme)
                    loading.dismiss()
                } catch (error) {
                    loading.dismiss()
                }

            },
        }, {
            text: t('text.delete.no'),
            role: 'cancel'
        }],
    });

    await alert.present();



}


const addAlarmeCodeScan = async () => {

    const loading = await loadingController.create({
        message: t('account.loading')
    })
    try {
        const res = await startCodeScan()
        if (res) {
            loading.present()
            const alarme = JSON.parse(res) as iAlarme
            await alarmeStore.setAlarme(alarme)
            await alarmeStore.getAlarmes()
            loading.dismiss()
        }
    } catch (error) {
        loading.dismiss()
    }
}

const doRefresh = async (e: any) => {
    try {
        await alarmeStore.getAlarmes()

        //Reset Alrmes Filters
        datatime.value.$el.reset()
        dateSelectSearch.value = alarmeStore.alarmes[0].at
        filterType.value = EfilterType.month


        isFilterDay.value = true
        isFilterMonth.value = false

        e.target.complete()

    } catch (error) {
        e.target.complete()
    }
}

//Search Calender
enum EfilterType {
    day = 'day',
    month = 'month'
}

const dateSelectSearch = ref()
const filterType = ref<EfilterType>(EfilterType.day)

watch(alarmeStore.alarmes, () => {
    searchDate()
})

//Si cambia la fecha, agragar la fecha de calendario a la referencia de la fecha que se desea buscar
const searchDate = async (e?: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) => {
    if (e?.target.value) {
        dateSelectSearch.value = e.target.value
    } else {
        dateSelectSearch.value = alarmeStore.alarmes[0].at
    }
}


//Formatear date string a Objeto Date
const stringDateFormat = (date: string) => {
    return new Date(date)
}



//Filtrar Fecha de calendario
const filterSearch = (al: iAlarme, iFilter: EfilterType | null = null): iAlarme | undefined => {
    switch (iFilter ?? filterType.value) {
        case 'month':
            if (`${stringDateFormat(al.at).getFullYear()}-${stringDateFormat(al.at).getMonth()}` == `${stringDateFormat(dateSelectSearch.value).getFullYear()}-${stringDateFormat(dateSelectSearch.value).getMonth()}`) {
                return al
            }
            break;

        case 'day':
            if (`${stringDateFormat(al.at).getFullYear()}-${stringDateFormat(al.at).getMonth()}-${stringDateFormat(al.at).getDate()}` === `${stringDateFormat(dateSelectSearch.value).getFullYear()}-${stringDateFormat(dateSelectSearch.value).getMonth()}-${stringDateFormat(dateSelectSearch.value).getDate()}`) {
                return al
            }
            break;
    }
}

const getHighlighted = () => {
    return alarmeStore.alarmes.map(al => {
        const dateAt = new Date(al.at)
        return {
            date: `${dateAt.getFullYear()}-${(dateAt.getMonth() + 1).toString().padStart(2, '0')}-${dateAt.getDate().toString().padStart(2, '0')}`,
            textColor: '#fff',
            backgroundColor: (al.color) ? al.color : ''
        }
    })
}


//Add alarma

const addAlarm = async () => {
    router.push('/tabs/addAlarm')
}

</script>
  

<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
                <ion-buttons slot="start">
                    <ion-back-button ref="/tabs/mycuenta" defaultHref="/tabs/mycuenta"></ion-back-button>
                </ion-buttons>

                <ion-button class=" ion-margin-end" color="dark" mode="ios" slot="end" @click="addAlarmeCodeScan()">
                    <ion-icon :icon="qrCodeOutline"></ion-icon>
                </ion-button>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button mode="ios" color="primary" @click="addAlarm()">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>


            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <ion-card>
                <ion-datetime ref="datatime" @click="searchDate" presentation="date" size="cover"
                    :highlighted-dates="getHighlighted()" @ion-change="searchDate">
                </ion-datetime>
            </ion-card>

            <!-- <ion-select class=" ion-margin" v-model="filterType">
                <ion-select-option :key="fty" v-for="fty in EfilterType" :value="fty">{{ $t(`text.filterType.${fty}`)
                }}</ion-select-option>
            </ion-select> -->

            <!--Dia-->

            <ion-list mode="ios" class=" ion-margin">
                <ion-item :color="(isFilterDay) ? `primary` : undefined" @click="isFilterDay = !isFilterDay">
                    <ion-label>
                        {{ $t(`text.filterType.day`)
                        }}
                    </ion-label>
                    <ion-icon slot="start" :icon="filterOutline"></ion-icon>
                </ion-item>

                <ion-item-sliding v-if="isFilterDay"
                    v-for=" alarme  in  alarmeStore.alarmes.filter(al => filterSearch(al, EfilterType.day)) ">
                    <ion-item @contextmenu="removeAlarme(alarme.id)" button :detail="false">
                        <ion-avatar slot="start">
                            <img :style="`background-color:${alarme.color};`"
                                :src="`/assets/icon_${alarme.alarmeCategory}.png`" />
                        </ion-avatar>

                        <ion-label class="ion-text-wrap">
                            <h1>{{ alarme.body }}</h1>

                            <h4 v-if="alarme.repeat">{{ $t('text.repeatAlarm') }}</h4>

                            <h2 v-if="!alarme.repeat">{{ (new Date(alarme.at)).toLocaleString(undefined, options) }}
                            </h2>

                            <h2 v-else> {{ $t('text.frequencyC') }} ({{ alarme.count }}) {{ $t('text.cada.' +
                                alarme.every) }}
                            </h2>

                        </ion-label>

                        <share-edit :text-share="alarme"></share-edit>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option @click="removeAlarme(alarme.id)" color="danger">
                            <ion-icon size="large" slot="start" :icon="trash"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>


            <!--Mes-->
            <ion-list mode="ios" class=" ion-margin">

                <ion-item :color="(isFilterMonth) ? `primary` : undefined" @click="isFilterMonth = !isFilterMonth">
                    <ion-label>
                        {{ $t(`text.filterType.month`)
                        }}
                    </ion-label>
                    <ion-icon slot="start" :icon="filterOutline">

                    </ion-icon>
                </ion-item>

                <ion-item-sliding v-if="isFilterMonth"
                    v-for=" alarme  in  alarmeStore.alarmes.filter(al => filterSearch(al, EfilterType.month)) ">
                    <ion-item @contextmenu="removeAlarme(alarme.id)" button :detail="false">
                        <ion-avatar slot="start">
                            <img :style="`background-color:${alarme.color};`"
                                :src="`/assets/icon_${alarme.alarmeCategory}.png`" />
                        </ion-avatar>

                        <ion-label class="ion-text-wrap">
                            <h1>{{ alarme.body }}</h1>

                            <h4 v-if="alarme.repeat">{{ $t('text.repeatAlarm') }}</h4>


                            <h2 v-if="!alarme.repeat">{{ (new
                                Date(alarme.at)).toLocaleString(undefined,
                                    options) }}
                            </h2>

                            <h2 v-else> {{ $t('text.frequencyC') }} ({{ alarme.count }}) {{ $t('text.cada.' +
                                alarme.every) }}
                            </h2>
                        </ion-label>

                        <share-edit :text-share="alarme"></share-edit>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option @click="removeAlarme(alarme.id)" color="danger">
                            <ion-icon size="large" slot="start" :icon="trash"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>


            <ion-row v-show="!alarmeStore.alarmes.length">
                <ion-col class=" ion-padding" size="12">
                    <ion-text>
                        <h1>{{ $t('text.noAlarmes') }} <ion-icon color="primary" size="large" :icon="alarm"></ion-icon>
                        </h1>
                    </ion-text>
                </ion-col>
            </ion-row>

        </ion-content>
    </ion-page>
</template>


<style scoped></style>

