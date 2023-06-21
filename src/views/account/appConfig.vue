<script lang="ts" setup>
import {
    IonItemGroup, IonButtons, IonBackButton, IonIcon, IonTitle, IonToolbar, IonItem, IonHeader, IonContent, IonText, IonPage, IonLabel, IonInput, IonAvatar, IonRow, IonCol, IonDatetime,
    IonDatetimeButton, IonModal, IonItemDivider, IonSelect, IonSelectOption
} from '@ionic/vue';
import openAlert from '@/ts/openAlert';
import { alertController, loadingController, useIonRouter } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { createOutline, settingsSharp, linkOutline, server } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';
import RegExps from '@/ts/RegExps';
import paises from '@/ts/paises';
import { useAppStore } from '@/store/app';
// import { useAppStore } from '@/store/app';

const accountStore = useAccountStore();

const { t } = useI18n()

const disabled = ref(true)
const disabledEdit = ref(true)
const appStore = useAppStore()

const user = computed(
    () => {
        return accountStore.userAll
    }
)

const router = useIonRouter()

onMounted(() => {
    // useAppStore().getDataApp('userAll')

    userNew.value.dateOfBirth = (/^\d{1,4}/.exec(userNew.value.dateOfBirth)) ? userNew.value.dateOfBirth : undefined
})

const userNew = ref({ ...user.value })




const saveConfig = async () => {
    // openAlert('user.saved', t, alertController, t('user.config'));


    //Validar

    const loading = await loadingController.create({
        message: t("account.loading"),
        translucent: true,
    });


    try {

        //Si el campo disabledEdit no esta desactivado, entonces no continuar con la edicion
        if (disabledEdit.value) {
            router.push("/tabs/mycuenta");
            throw new Error('No edit')
        }


        //Validar metodo de verificacion
        if (!userNew.value.name || !RegExps.name.exec(userNew.value.name)) {
            throw new Error(await openAlert('account.nameError', t, alertController))
        }

        if (userNew.value.numberCode && !RegExps.numberCode.exec(userNew.value.numberCode)) {
            throw new Error(await openAlert('account.numberCodeError', t, alertController))
        }

        if (!userNew.value.phone || !RegExps.phone.exec(userNew.value.phone)) {
            throw new Error(await openAlert('account.phoneError', t, alertController))
        }


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
            accountStore.cleanUser()
            router.push("/tabs/login");
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


<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
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

            <ion-row class=" ion-justify-content-center ion-padding">
                <ion-col size="auto">
                    <!--slot="start"-->
                    <ion-avatar>
                        <img src="@/assets/logoApp.png">
                    </ion-avatar>

                    <ion-label @click="disabledEdit = !disabledEdit">
                        <ion-icon size="large" :icon="createOutline">
                        </ion-icon>
                        {{ $t('account.edit') }}
                    </ion-label>
                </ion-col>
            </ion-row>
            <ion-item-group class=" ion-padding">
                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.name') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.name" type="text" :placeholder="$t('account.placeholder.add')">
                    </ion-input>
                </ion-item>

                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.country') }}
                    </ion-label>

                    <ion-select v-if="user" :placeholder="$t('account.placeholder.country')" v-model="userNew.country">
                        <ion-select-option v-for=" pais  in  paises " :key="pais.countryName" :value="pais.countryName">
                            {{ pais.countryName }}</ion-select-option>
                    </ion-select>

                    <!-- <ion-input v-if="user" v-model="userNew.country" type="text"
                        :placeholder="$t('account.placeholder.add')">
                    </ion-input> -->
                </ion-item>

                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.dateOfBirth') }}
                    </ion-label>

                    <ion-datetime-button datetime="datetime"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime id="datetime" presentation="month-year" v-model="userNew.dateOfBirth"
                            :prefer-wheel="true">
                        </ion-datetime>

                    </ion-modal>
                </ion-item>


                <ion-item :disabled="disabledEdit">
                    <ion-label position="fixed" class=" ion-text-wrap">{{ $t('account.placeholder.phone') }}</ion-label>
                    <ion-input autocomplete="tel" v-model="userNew.phone" inputmode="tel" type="number">
                    </ion-input>
                </ion-item>


                <ion-item :disabled="disabled">
                    <ion-label position="fixed" class=" ion-text-wrap">
                        {{ $t('account.placeholder.email') }}
                    </ion-label>
                    <ion-input v-if="user" v-model="userNew.email" type="text" :placeholder="$t('account.placeholder.add')">
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

                <ion-item button @click="router.replace({
                    name: 'changePassword'
                })">
                    <ion-icon slot="start" :icon="settingsSharp"></ion-icon>
                    <ion-label class="textItem">
                        {{ $t('account.placeholder.password') }}
                    </ion-label>

                </ion-item>

                <ion-item button @click="router.push({
                    name: 'accountdata'
                })">
                    <ion-icon slot="start" :icon="server"></ion-icon>
                    <ion-label class="textItem">
                        {{ $t('user.accountData') }}
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

