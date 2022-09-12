<template>
  <ion-page>

    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button :text="$t('text.back')" defaultHref="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <div class="cover-box"></div>

      <ion-grid class="ion-margin-top">

        <!--animate__animated animate__zoomIn-->
        <ion-row class="ion-justify-content-center">
          <ion-col size-lg="6" size-sm="12">
            <ion-card>
              <ion-card-header>
                <ion-row class="ion-justify-content-center ion-text-center">
                  <ion-avatar>
                    <img src="@/assets/logoApp.png" />
                  </ion-avatar>
                </ion-row>
                <ion-card-title class="ion-text-center">
                  {{ $t('account.changePassword') }}
                </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">

                    <ion-input v-model="user.password" type="password"
                      :placeholder="$t('account.placeholder.newPassword')"></ion-input>


                    <ion-input v-model="confirmePassword" type="password"
                      :placeholder="$t('account.placeholder.confirmePassword')"></ion-input>

                    <!-- <ion-input v-model="user.code" inputmode="numeric" type="number"
                      :placeholder="t('account.placeholder.recoveryCode')"></ion-input> -->


                    <div class="ion-padding-bottom ion-padding-top">
                      <ion-button @click="changePassword()" color="primary">{{ $t('account.change') }}
                      </ion-button>
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
  IonButtons,
  useIonRouter
} from "@ionic/vue";
import "animate.css";
// import { ref } from "vue";

import { computed } from "@vue/reactivity";
// import { watch } from "vue";

//Logica
import { useAccountStore } from "@/store/account";
// import { useRouter } from "vue-router";
import regExps from "@/ts/RegExps";
import openAlert from "@/ts/openAlert";
import { useI18n } from "vue-i18n";
import { alertController, loadingController } from "@ionic/vue";
import { ref } from "vue";

const ionRouter = useIonRouter();


const confirmePassword: any = ref();

const { t } = useI18n();

// const router = useRouter()

const account = useAccountStore();

const user = computed(() => {
  return account.user;
});


const changePassword = async (): Promise<any> => {

  const loading = await loadingController.create({
    cssClass: 'my-custom-class',
    message: t('account.loading')
  });

  try {


    if (!regExps.code.exec(user.value.code)) {

      ionRouter.back();
      account.user.code = undefined;
      throw new Error(await openAlert('account.codeRecoveryError', t, alertController));
      //Error of Password 
    }


    if (!regExps.password.exec(user.value.password)) {
      throw new Error(await openAlert("account.incorrectPassword", t, alertController));
      //Error of Password 
    }

    if (confirmePassword.value != user.value.password) {
      throw new Error(await openAlert('account.passwordConfirmeError', t, alertController));
      //Error of Password 
    }

    loading.present();
    const res = await account.changePassword();

    if (!res) {
      throw new Error(t("account.errorApp"));
    }

    if (res.status === 400) {

      throw new Error(await openAlert('account.errorChangePassword', t, alertController))
    }

    if (res.status === 401) {
      account.user.password = undefined;
      confirmePassword.value = undefined;
      account.user.code = undefined;
      ionRouter.back();
      throw new Error(await openAlert('account.errorChangePassword', t, alertController))
    }

    if (res.status === 404) {
      ionRouter.back();
      account.user.code = undefined;
      throw new Error(await openAlert('account.error404', t, alertController))
    }

    if (res.status === 403) {
      throw new Error(await openAlert('account.error403', t, alertController))
    }



    if (res.status === 500) {
      throw new Error(await openAlert('account.errorServer', t, alertController))
    }


    if (res.status == 200 || res.status == 201) {
      loading.dismiss();
      account.user.code = undefined; //Limpiar codigo
      openAlert(t("account.changePasswordReady"), t, alertController);
      ionRouter.push("/tabs/login");
    } else {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }


  } catch (error) {
    console.log(error)
    loading.dismiss();
  }

}
</script>

<style scoped>
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
