<template>
  <ion-page>

    <ion-header translucent>
      <ion-toolbar color="primary">

        <ion-buttons slot="start">
          <ion-back-button :text="$t('text.back')" defaultHref="/"></ion-back-button>
        </ion-buttons>

        <!-- <ion-text slot="start" class=" ion-text-center ion-padding-start">
          <h2>{{ $t('titles.login') }}</h2>
        </ion-text> -->

        <!-- <ion-avatar class=" ion-margin-end" slot="end">
          <img src="@/assets/logoApp.png">
        </ion-avatar> -->

      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-grid class="ion-margin-top">
        <div class="cover"></div>
        <ion-row class="animate__animated animate__zoomIn ion-justify-content-center">
          <ion-col size-lg="6" size-sm="12">
            <ion-card>
              <ion-card-header>
                <!-- <ion-card-title @click="$router.back()">
                  <ion-icon :icon="chevronBackOutline"></ion-icon> {{ $t('text.back') }}
                </ion-card-title> -->
                <ion-row class="ion-justify-content-center ion-text-center">
                  <ion-avatar>
                    <img src="@/assets/logoApp.png" />
                  </ion-avatar>
                </ion-row>
                <ion-card-title class="ion-text-center">
                  {{ t('account.createAccount') }}
                </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">

                    <!--Imput Account-->
                    <ion-input v-if="!setCode" v-model="user.email" type="text" placeholder="Email de Recuperación">
                    </ion-input>
                    <ion-input v-else class=" ion-padding codeText" v-model="user.code" inputmode="numeric"
                      type="number" :placeholder="t('account.placeholder.recoveryCode')"></ion-input>

                    <div class="ion-padding-bottom ion-padding-top">
                      <ion-button v-if="!setCode" @click="setCodeRecoveryEmail()" color="primary">
                        {{ t('account.setCode') }}</ion-button>
                      <ion-button v-else @click="$router.replace({
                        name: 'newPassword'
                      })" color="primary">{{ t('account.next') }}</ion-button>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonGrid,
  IonContent,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  // IonText,
  IonCol,
  IonInput,
  IonButton,
  IonAvatar,
  IonPage,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons
} from "@ionic/vue";
import "animate.css";
// import { ref } from "vue";

import { computed } from "@vue/reactivity";
// import { watch } from "vue";


//Logica
import { useAccountStore } from "@/store/account";
// import { useRouter } from "vue-router";
// const router = useRouter()
import openAlert from "@/ts/openAlert";
import { useI18n } from "vue-i18n";
import { alertController, loadingController } from "@ionic/vue";
import { ref } from "vue";
import regExps from "@/ts/RegExps";

const { t } = useI18n();

const account = useAccountStore();
const setCode = ref(false)
const user = computed(() => {
  return account.user;
});


const setCodeRecoveryEmail = async (): Promise<any> => {

  const loading = await loadingController.create({
    message: t("account.loading"),
    translucent: true,
  });

  try {

    if (!user.value.email || !regExps.email.exec(user.value.email)) {
      throw new Error(await openAlert('account.emailError', t, alertController));
    }

    loading.present();
    const res = await account.setCodeRecovery();

    if (!res) {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }


    if (res.status === 400) {
      account.cleanUser() //Si el usuario existe, borramos los datos del formulario
      throw new Error(await openAlert('account.setCodeRecoveryError', t, alertController))
    }

    if (res.status === 401) {
      account.cleanUser(); //Si el usuario existe, borramos los datos del formulario
      throw new Error(await openAlert('account.setCodeRecoveryError', t, alertController))
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
      //COdigo de recuperacion enviado
      setCode.value = true;
    } else {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }

    loading.dismiss();

  } catch (error) {
    console.log(error);
    setCode.value = false;
    loading.dismiss();
  }

}


</script>

<style scoped>
.cover {
  position: fixed;
  top: -30%;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("@/views/ypw/assets/cover.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

.codeText {
  font-size: 30px;
  border: 1px solid rgb(166, 166, 166);
}

ion-grid {
  margin-top: 25%;
}

ion-input {
  font-size: 20px;
  border-bottom: 0.1px solid var(--ion-color-dark);
  margin-top: 5px;
  padding-left: 10px;
}
</style>
