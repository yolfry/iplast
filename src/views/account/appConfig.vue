<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('titles.config') }}</ion-title>
                <ion-buttons slot="primary">
                    <ion-text class="ion-padding-end" @click="saveConfig()">
                        <h5>{{ $t('user.save') }}</h5>
                    </ion-text>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!-- <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $t('titles.config') }}</ion-title>
                </ion-toolbar>
            </ion-header> -->
            <ion-row class=" ion-justify-content-center ion-padding">
                <ion-col size="auto">
                    <!--slot="start"-->
                    <ion-avatar>
                        <img src="@/assets/logoApp.png">
                    </ion-avatar>

                    <ion-label @click="disabledEdit = !disabledEdit">
                        <ion-icon size="large" :icon="createOutline">
                        </ion-icon>
                        Editar
                    </ion-label>
                </ion-col>
            </ion-row>
            <ion-item-group class=" ion-padding">
                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.name') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.name" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.country') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.country" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.dateOfBirth') }}
                    </ion-label>

                    <ion-datetime-button datetime="datetime"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime id="datetime" presentation="month-year" v-model="userNew.dateOfBirth"
                            :prefer-wheel="true" :value="userNew.dateOfBirth">
                        </ion-datetime>
                    </ion-modal>


                </ion-item>

                <ion-item :disabled="disabled">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.email') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.email" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item :disabled="disabled">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.phone') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.phone" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item :disabled="disabled">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.username') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.username" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item-divider>
                    <ion-label>{{ $t('account.placeholder.segurity') }}</ion-label>
                </ion-item-divider>

                <ion-item button @click="$router.replace({
                  name: 'changePassword'
                })">
                    <ion-icon slot="start" :icon="settingsSharp"></ion-icon>
                    <ion-label class="textItem">
                        {{ $t('account.placeholder.password') }}
                    </ion-label>

                </ion-item>

                <ion-item-divider>
                    <ion-label>{{ $t('account.placeholder.help') }}</ion-label>
                </ion-item-divider>


                <ion-item button href="https://iplastdr.com">
                    <ion-icon slot="start" :icon="linkOutline"></ion-icon>
                    <ion-label class="textItem">
                        iplastdr.com
                    </ion-label>

                </ion-item>


            </ion-item-group>

        </ion-content>

    </ion-page>
</template>


<script lang="ts" setup>
import {
    IonItemGroup, IonButtons, IonBackButton, IonIcon, IonTitle, IonToolbar, IonItem, IonHeader, IonContent, IonText, IonPage, IonLabel, IonInput, IonAvatar, IonRow, IonCol, IonDatetime,
    IonDatetimeButton, IonModal, IonItemDivider
} from '@ionic/vue';
import openAlert from '@/ts/openAlert';
import { alertController, loadingController, useIonRouter } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { createOutline, settingsSharp, linkOutline } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';
// import { useAppStore } from '@/store/app';

const accountStore = useAccountStore();

const { t } = useI18n()

const disabled = ref(true)
const disabledEdit = ref(true)

const user = computed(
    () => {
        return accountStore.userAll
    }
)

const router = useIonRouter()

const userNew = ref({ ...user.value })

onMounted(() => {
    // useAppStore().getDataApp('userAll')
})


const saveConfig = async () => {
    // openAlert('user.saved', t, alertController, t('user.config'));

    const loading = await loadingController.create({
        message: t("account.loading"),
        translucent: true,
    });


    try {

        await loading.present();
        accountStore.userAll = { ...userNew.value }
        const res = await accountStore.updateUser()

        if (!res) {
            throw new Error(await openAlert('account.errorApp', t, alertController))
        }

        if (res.status === 400) {
            // account.cleanUser() //Si el usuario existe, borramos los datos del formulario
            throw new Error(await openAlert('account.updateError', t, alertController))
        }

        if (res.status === 401) {
            // account.cleanUser(); //Si el usuario existe, borramos los datos del formulario
            throw new Error(await openAlert('account.updateError', t, alertController))
        }

        if (res.status === 404) {
            throw new Error(await openAlert('account.error404', t, alertController))
        }

        if (res.status === 403) {
            throw new Error(await openAlert('account.error403', t, alertController))
        }

        if (res.status === 500) {
            throw new Error(await openAlert('account.errorServer', t, alertController))
        }

        if (res.status === 200 || res.status === 201) {
            disabledEdit.value = !disabledEdit.value
            //Ir a cuenta, Luego de que el usuario se registre
            router.push("/tabs/mycuenta");
            loading.dismiss();
        } else {
            throw new Error(await openAlert('account.errorApp', t, alertController))
        }

    } catch (error) {
        loading.dismiss();
    }


}

</script>