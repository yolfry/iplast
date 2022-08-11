<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('titles.config') }}</ion-title>
                <ion-buttons slot="primary">
                    <ion-text color="primary" class="ion-padding-end" @click="saveConfig()">
                        <h5>{{ $t('user.save') }}</h5>
                    </ion-text>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $t('titles.config') }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-item-group class=" ion-padding">
                <ion-item>
                    <ion-label>
                        <ion-icon :icon="createOutline"></ion-icon> {{ $t('account.placeholder.name') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.name" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item>
                    <ion-label>
                        <ion-icon :icon="createOutline"></ion-icon> {{ $t('account.placeholder.email') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.email" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item>
                    <ion-label>
                        <ion-icon :icon="createOutline"></ion-icon> {{ $t('account.placeholder.phone') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.phone" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

            </ion-item-group>
        </ion-content>

    </ion-page>
</template>


<script lang="ts" setup>
import { IonItemGroup, IonButtons, IonBackButton, IonIcon, IonTitle, IonToolbar, IonItem, IonHeader, IonContent, IonText, IonPage, IonLabel, IonInput } from '@ionic/vue';
import openAlert from '@/ts/openAlert';
import { alertController } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { createOutline } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';
// import { useAppStore } from '@/store/app';

const { t } = useI18n()

const user = computed(
    () => {
        return useAccountStore().userAll
    }
)

const userNew = ref({ ...user.value })

onMounted(() => {
    // useAppStore().getDataApp('userAll')
})


const saveConfig = async () => {
    openAlert('user.saved', t, alertController, t('user.config'));
    return true
}

</script>