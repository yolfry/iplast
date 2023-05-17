
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
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonModal,
    IonRadioGroup,
    IonRadio,
    IonDatetime,
    IonTextarea,
    IonChip,
    IonAvatar,
    IonCard,
    IonItemSliding,
    IonItemOptions,
    IonCardContent,
    IonItemOption,
    loadingController,
    IonProgressBar
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { add, trash } from "ionicons/icons";
import alarmeType from '@/enums/alarmeType'
import { useI18n } from "vue-i18n";
import { useAlarmeStore } from "@/store/alarme";
import alarmeCategory from "@/enums/alarmeCategory";
import { iAlarme } from "@/interfaces/iAlarme";

const { t } = useI18n()
const alarmeStore = useAlarmeStore()



const isLoading = ref(false)




onMounted(async () => {
    try {
        isLoading.value = true
        await alarmeStore.initializeNotification()
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
    }
})



const isOpenModal = ref<boolean>(false)


const date = new Date()


//Open Modal Action
const openModal = () => {
    isOpenModal.value = true
}



//Guardar Alarma
const saveAlarme = async () => {



    try {
        isLoading.value = true
        await alarmeStore.setAlarme()
        isOpenModal.value = false
        isLoading.value = false

    } catch (error: any) {
        console.log(error.message)
        isLoading.value = false
    }
}

const removeAlarme = async (idAlarme: number) => {

    try {
        isLoading.value = true
        await alarmeStore.delete(idAlarme)
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
    }

}

const repeatAlarme = async (alarme: iAlarme) => {


    try {
        isLoading.value = true
        await alarmeStore.repeatAlarme(alarme)
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
    }
}


const appStore = useAppStore()
</script>
  

  

<template>
    <ion-page>
        <ion-header translucent>
            <ion-progress-bar v-show="isLoading" type="indeterminate"></ion-progress-bar>
            <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title slot="start">{{ $t('text.alarme') }}</ion-title>

                <ion-button slot="end" color="dark" size="large" @click=" openModal()" mode="ios">
                    <ion-icon size="large" :icon="add"></ion-icon> {{ $t('text.addAlarm') }}
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-row>
                <ion-col>
                    <ion-list mode="ios" class=" ion-margin">
                        <ion-item-sliding v-for="alarme in alarmeStore.alarmes.reverse()">
                            <ion-item button :detail="false">
                                <ion-avatar slot="start">
                                    <img style="background-color:var(--ion-icon-background-color);"
                                        :src="`/assets/icon_${alarme.alarmeCategory}.png`" />
                                </ion-avatar>

                                <ion-label class="ion-text-wrap">
                                    <h1>{{ alarme.body }}</h1>
                                    <h2>{{ (alarme.at) ? `${(new Date(alarme.at)).getFullYear()}-${(new
                                        Date(alarme.at)).getMonth() + 1}-${(new Date(alarme.at)).getDate()}` : null }}</h2>
                                </ion-label>


                                <ion-toggle @click="repeatAlarme(alarme)" :checked="alarme.repeat" slot="end"></ion-toggle>
                            </ion-item>

                            <ion-item-options side="end">
                                <ion-item-option color="danger">
                                    <ion-icon @click="removeAlarme(alarme.id)" size="large" slot="start"
                                        :icon="trash"></ion-icon>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>

                    </ion-list>


                    <!--Modal add edit calender-->
                    <ion-modal :is-open="isOpenModal">
                        <ion-header>
                            <ion-toolbar>
                                <ion-buttons slot="start">
                                    <ion-button @click="isOpenModal = !isOpenModal">{{ $t('account.cancel')
                                    }}</ion-button>
                                </ion-buttons>
                                <ion-title class=" ion-text-center">{{ $t('text.alarme') }}</ion-title>
                                <ion-buttons slot="end">
                                    <ion-button :strong="true" @click="saveAlarme()">{{ $t('account.confirm')
                                    }}</ion-button>
                                </ion-buttons>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content :fullscreen="true">

                            <ion-row>
                                <ion-col class=" ion-padding">
                                    <ion-chip
                                        :class="alarmeStore.alarme.alarmeCategory == category ? 'select' : 'no-select'"
                                        @click="alarmeStore.alarme.alarmeCategory = category"
                                        v-for="category in alarmeCategory">
                                        <ion-avatar>
                                            <img style="background-color:var(--ion-icon-background-color);"
                                                :src="`/assets/icon_${category}.png`" />
                                        </ion-avatar>

                                        <ion-label class="ion-text-wrap">{{ t(`text.alarmeCategory.${category}`) }}
                                        </ion-label>
                                    </ion-chip>
                                </ion-col>
                            </ion-row>

                            <ion-card mode="ios">
                                <ion-card-content>
                                    <ion-label>
                                        <h2>{{ $t('text.alarmeName') }}</h2>
                                    </ion-label>
                                    <ion-textarea v-model="alarmeStore.alarme.body"
                                        :placeholder="$t(`text.alarme`)"></ion-textarea>
                                </ion-card-content>
                            </ion-card>

                            <template v-if="alarmeStore.alarme.type == alarmeType.specific">
                                <ion-card mode="ios">
                                    <ion-datetime size="cover"
                                        :min="`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`"
                                        hourCycle="h12" :value="(new Date()).toISOString()" v-model="alarmeStore.alarme.at">
                                        <span slot="time-label">{{ t('text.hour') }}</span>
                                    </ion-datetime>
                                </ion-card>

                                <ion-item class="ion-margin ion-padding-vertical" mode="ios">
                                    <ion-label>
                                        <h2>{{ t('text.repeatAlarm') }}</h2>
                                    </ion-label>
                                    <ion-toggle mode="ios" v-model="alarmeStore.alarme.repeat"
                                        :checked="alarmeStore.alarme.repeat"></ion-toggle>
                                </ion-item>

                            </template>

                            <template v-else>
                                Frecuencia
                            </template>


                        </ion-content>
                    </ion-modal>
                </ion-col>
            </ion-row>

        </ion-content>
    </ion-page>
</template>


<style scoped>
.select {
    --background: #00213f;
    --color: #adefd1;
}
</style>

