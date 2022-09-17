
<script lang="ts" setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRow,
    IonItem,
    IonLabel,
    IonList,
    IonIcon,
    IonCol,
    IonRefresher,
    IonRefresherContent,
    useIonRouter,
    IonButtons,
    IonBackButton,
    IonButton,
    IonInput,
    IonItemDivider
} from "@ionic/vue";
import { trash, serverOutline, personCircleOutline } from "ionicons/icons";

import { computed, onMounted, ref } from "vue";
import { useAccountStore } from "@/store/account";
import { useI18n } from "vue-i18n";
import { alertController, loadingController } from "@ionic/vue";
import openAlert from "@/ts/openAlert";
import regExps from "@/ts/RegExps";

const account = useAccountStore();
const router = useIonRouter();
const dataSize = ref()
const isMB = ref(false)
const isDeleteAccount = ref(false)


const doRefresh = async (e: any) => {
    await account.getUserData();
    calDataSize()
    e.target.complete();
}

const { t } = useI18n();


const userAll = computed(() => {
    return account.userAll;
});

const calDataSize = () => {
    //Calcular Tamaño de la cuenta en datos
    console.log(userAll.value)
    const size = new TextEncoder().encode(JSON.stringify(userAll.value)).length
    dataSize.value = (size / 1024)

    //Converte MB
    if (dataSize.value >= 1024) {
        isMB.value = true
        dataSize.value = (dataSize.value / 1024)
    }
}

onMounted(async () => {


    //No password
    account.user.password = undefined
    calDataSize()

})

const deleteAccount = async (): Promise<void> => {

    const alert = await alertController.create({
        header: "Alert",
        message: t("user.deleteAccount"),
        buttons: [
            {
                text: t('text.no'),
                role: "cancel",
                handler: () => {
                    //Eliminar Contrase-na
                    account.user.password = undefined
                    console.log('cancel')
                }
            },
            {
                text: t('text.yes'),
                handler: async () => {

                    const loading = await loadingController.create({
                        message: t("account.loading"),
                        translucent: true,
                    });


                    try {

                        if (!account.user.password || !regExps.password.exec(account.user.password)) {
                            throw new Error(await openAlert('account.incorrectPassword', t, alertController))
                        }
                        loading.present();

                        const response = await account.deleteAccount()

                        if (response?.status === 400) {
                            throw new Error(await openAlert('account.deleteAccountError', t, alertController))
                        }

                        if (response?.status === 401) {
                            throw new Error(await openAlert('account.deleteAccountError', t, alertController))
                        }

                        if (response?.status === 404) {
                            throw new Error(await openAlert('account.deleteAccountError', t, alertController))
                        }

                        if (response?.status === 403) {
                            throw new Error(await openAlert('account.error403', t, alertController))
                        }

                        if (response?.status === 422) {
                            throw new Error(await openAlert('account.errorServer', t, alertController))
                        }

                        if (response?.status === 500) {
                            throw new Error(await openAlert('account.errorServer', t, alertController))
                        }


                        if (response?.status == 200 || response?.status == 201) {

                            //Cerrar Sexion
                            const res = await account.logout()
                            if (res) {
                                router.push('/tabs/login')
                            } else {
                                console.log('Log Out Error')
                            }
                        }

                        loading.dismiss();

                    } catch (error) {
                        loading.dismiss();
                        //No password
                        account.user.password = undefined
                        console.log(error)
                    }

                }
            }
        ]
    });

    alert.present();
}


account.getUserData()


</script>
      

    
<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title slot="start">{{ $t('user.accountData') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">



            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <ion-row>
                <ion-col>
                    <ion-list>
                        <ion-item color="tertiary">
                            <ion-icon slot="start" :icon="personCircleOutline" color="primary"></ion-icon>
                            <ion-label class="textItem">
                                {{ userAll.name }}
                            </ion-label>
                        </ion-item>

                        <ion-item color="tertiary">
                            <ion-icon slot="start" :icon="serverOutline" color="primary"></ion-icon>
                            <ion-label class="textItem">
                                {{Math.round(dataSize)}} {{ (isMB==true)? ` MB`: `KB` }}
                            </ion-label>
                        </ion-item>

                        <ion-item button @click="isDeleteAccount=!isDeleteAccount" color="danger">
                            <ion-icon slot="start" :icon="trash"></ion-icon>
                            <ion-label class="textItem">
                                {{ $t('user.deleteAccount') }}
                            </ion-label>
                        </ion-item>
                        <ion-item-divider v-show="isDeleteAccount"></ion-item-divider>

                        <ion-item color="tertiary" v-show="isDeleteAccount">
                            <ion-label position="fixed" class=" ion-text-wrap">{{$t('account.placeholder.password')}}
                            </ion-label>
                            <ion-input v-model="account.user.password" type="password"
                                :placeholder="$t('account.placeholder.password')"></ion-input>
                            <ion-button @click="deleteAccount()" color="danger">
                                {{$t('user.delete')}}
                            </ion-button>
                        </ion-item>


                    </ion-list>
                </ion-col>
            </ion-row>


        </ion-content>
    </ion-page>
</template>
    
<style scoped>
.textItem {
    font-size: 20px;
}

ion-item {
    margin-bottom: 2px;
}
</style>
          
<style>
ion-avatar {
    margin: 5px;
}
</style>