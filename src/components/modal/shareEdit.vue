<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { IonModal, IonContent, IonImg, IonButton, IonIcon, IonDatetime, IonItem, IonToggle, IonLabel, IonHeader, IonToolbar, IonButtons, IonTextarea, IonChip, IonAvatar, IonRow, IonCol, IonBackButton } from '@ionic/vue';
import { save, arrowRedoOutline } from 'ionicons/icons';
import { getDate } from '@/ts/gatDate';
import qrcode from 'qrcode'
import { iAlarme } from '@/interfaces/iAlarme';
import { useAlarmeStore } from '@/store/alarme';
import { loadingController } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import alarmeCategory from '@/enums/alarmeCategory';

const { t } = useI18n()

const alarmeStore = useAlarmeStore()

const img = ref()
const saveDisabled = ref(true)
const isOpenModal = ref(false)
const isDisabledEdit = ref(true)

const props = defineProps({
    textShare: {
        type: Object,
        require: true
    }
})


const alarme = computed(() => {
    return props.textShare as iAlarme
})


watch(alarme.value, () => {
    saveDisabled.value = false
})


const onShare = async () => {
    const qr = await qrcode.toDataURL(JSON.stringify(alarme.value))
    img.value = qr
    isOpenModal.value = true
}

const updateAlarme = async () => {

    const loading = await loadingController.create({
        message: t('account.loading')
    })

    try {
        loading.prepend()
        await alarmeStore.cancelNotification(alarme.value.id)
        await alarmeStore.updateAlarme(alarme.value)
        await alarmeStore.setLocalNotification(alarme.value)
        await alarmeStore.saveAlarmes()
        loading.dismiss()
        await onShare()

        saveDisabled.value = true
        isDisabledEdit.value = true

    } catch (error) {
        loading.dismiss()
        saveDisabled.value = true
        isDisabledEdit.value = true
    }


}


</script>

<template>
    <IonButton v-if="alarme.id" color="dark" @click="onShare();" fill="clear">
        <ion-icon size="large" :icon="arrowRedoOutline"></ion-icon>
    </IonButton>

    <ion-modal v-if="alarme.id" :is-open="isOpenModal">

        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <!-- <ion-button fill="clear"><ion-icon :icon="chevronBackCircle" /></ion-button> {{ $t('text.back') }} -->
                    <ion-back-button @click="isOpenModal = false" ref="#" defaultHref="#"></ion-back-button>
                </ion-buttons>

                <!-- <ion-buttons slot="end">
                    <IonButton :disabled="saveDisabled" color="dark" @click="updateAlarme()" mode="ios" size="large">
                        {{ $t('user.save') }} <ion-icon slot="end" :icon="save"></ion-icon>
                    </IonButton>
                </ion-buttons> -->
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="ion-margin-top">
                <ion-img v-if="img" :src="img" />
            </div>

            <!-- <ion-row>
                <ion-col size="12">
                    <IonButton v-show="isDisabledEdit" fill="outline" class=" ion-margin" color="dark"
                        @click="isDisabledEdit = !isDisabledEdit" mode="ios">
                        {{ $t('account.edit') }}
                    </IonButton>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col class=" ion-margin-top ion-margin-bottom">
                    <ion-chip :disabled="isDisabledEdit" :class="alarme.alarmeCategory == category ? 'select' : 'no-select'"
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

            <ion-item :disabled="isDisabledEdit" class=" ion-margin-top ion-margin-bottom">
                <ion-label position="floating">
                    {{ $t('text.alarmeName') }}
                </ion-label>
                <ion-textarea v-model="alarme.body" :placeholder="$t(`text.alarme`)"></ion-textarea>
            </ion-item>

            <ion-datetime :disabled="isDisabledEdit" v-if="alarme.at" size="cover" :min="getDate()" hourCycle="h12"
                :value="getDate()" v-model="alarme.at">
                <span slot="time-label">{{ $t('text.hour') }}</span>
            </ion-datetime>


            <ion-item :disabled="isDisabledEdit" class="ion-margin-top" mode="ios">
                <ion-label>
                    <h2>{{ $t('text.repeatAlarm') }}</h2>
                </ion-label>
                <ion-toggle mode="ios" v-model="alarme.repeat" :checked="alarme.repeat"></ion-toggle>
            </ion-item>

            <ion-item :disabled="isDisabledEdit" v-if="alarme.color" class="ion-margin-top" mode="ios">
                <ion-label>
                    <h2>{{ $t('text.color') }}</h2>
                </ion-label>
                <input v-model="alarme.color" type="color" />
            </ion-item>

            <IonButton :disabled="saveDisabled" class=" ion-margin" color="dark" @click="updateAlarme()" mode="ios"
                size="large">
                {{ $t('user.save') }} <ion-icon slot="end" :icon="save"></ion-icon>
            </IonButton>

            <IonButton v-show="!isDisabledEdit" class=" ion-margin" fill="outline" size="large" color="dark"
                @click="isDisabledEdit = !isDisabledEdit; saveDisabled = true" mode="ios">
                {{ $t('account.cancel') }}
            </IonButton>

            <ion-item class="ion-margin-top">
            </ion-item> -->

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