<template>
  <ion-page>

    <ion-content :fullscreen="true">

      <ion-header translucent>
        <ion-toolbar color="primary">

          <ion-buttons slot="start">
            <ion-back-button :text="$t('text.back')" defaultHref="/"></ion-back-button>
          </ion-buttons>

          <!-- <ion-text slot="start" class=" ion-text-center ion-padding-start">
            <h2>{{ $t('account.createAccount') }}</h2>
          </ion-text> -->

          <!-- <ion-avatar class=" ion-margin-end" slot="end">
            <img src="@/assets/logoApp.png">
          </ion-avatar> -->

        </ion-toolbar>
      </ion-header>

      <ion-grid class="ion-margin-top">

        <div class="cover"></div>
        <!--animate__animated animate__zoomIn-->
        <ion-row class="ion-justify-content-center">
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
                <ion-card-title color="primary" class="ion-text-center">
                  {{ $t('account.createAccount') }}
                </ion-card-title>
                <ion-card-subtitle class="ion-text-center">
                  {{ $t('account.free') }}
                </ion-card-subtitle>

              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">

                    <!--Data register Input Entrada-->

                    <ion-item>
                      <ion-label position="floating">{{ $t('account.placeholder.name') }}</ion-label>
                      <ion-input v-model="user.name" autocomplete="name" type="text"></ion-input>
                    </ion-item>

                    <ion-item>
                      <ion-label position="floating">{{ $t('account.placeholder.email') }}</ion-label>
                      <ion-input v-model="user.email" autocomplete="email" type="text"></ion-input>
                    </ion-item>

                    <ion-row>
                      <ion-col size="4">
                        <ion-item>
                          <ion-label position="floating">{{ $t('account.placeholder.code') }}</ion-label>
                          <ion-input name="countryCode" :maxlength="5" inputmode="numeric"
                            autocomplete="tel-country-code" type="text" v-model="user.codePhone"
                            class=" ion-align-self-center">
                          </ion-input>
                        </ion-item>
                      </ion-col>
                      <ion-col class=" ion-align-self-auto">
                        <ion-item>
                          <ion-label position="floating">{{ $t('account.placeholder.phone') }}</ion-label>
                          <ion-input autocomplete="tel" v-model="user.phone" inputmode="tel" type="number"></ion-input>
                        </ion-item>
                      </ion-col>
                    </ion-row>

                    <ion-item>
                      <ion-label position="floating">{{ $t('account.placeholder.username') }}</ion-label>
                      <ion-input v-model="user.username" autocomplete="username" type="text">
                      </ion-input>
                    </ion-item>

                    <ion-item>
                      <ion-label position="floating">{{ $t('account.placeholder.password') }}</ion-label>
                      <ion-input v-model="user.password" type="password"></ion-input>
                    </ion-item>


                    <ion-item>
                      <ion-label position="floating">{{ $t('account.placeholder.confirmePassword') }}</ion-label>
                      <ion-input v-model="confirmePassword" type="password"></ion-input>
                    </ion-item>


                    <div class="ion-padding-bottom ion-padding-top ion-align-items-end">
                      <ion-button @click="register()" color="primary">{{ $t('account.next') }}</ion-button>
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
  IonCol,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonPage,
  IonButtons,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonAvatar,

} from "@ionic/vue";
import "animate.css";
import { ref } from "vue";

import { computed } from "@vue/reactivity";
import { alertController, loadingController } from "@ionic/vue";
import openAlert from "@/ts/openAlert";

import { useI18n } from "vue-i18n";

import { useAccountStore } from "@/store/account";
import { useRouter } from "vue-router";
import RegExps from "@/ts/RegExps";

//Declare y Use
const { t } = useI18n();
const router = useRouter()
const account = useAccountStore();


//Computed y Methods
const user = computed(() => {
  return account.user;
});

//Propiedades Radiativas
const confirmePassword = ref("");


// Funcion de Registro
const register = async () => {

  //Validaciones

  // if(/^$/){
  // }

  const loading = await loadingController.create({
    message: t("account.loading"),
    translucent: true,
  });

  try {

    //Eliminar espacio en blanco al inicio y al final de la cadena
    user.value.username = user.value.username?.replace(/\s/g, "");

    if (!user.value.username || !RegExps.username.exec(user.value.username)) {
      throw new Error(await openAlert('account.userNameError', t, alertController))
    }

    if (!user.value.name || !RegExps.name.exec(user.value.name)) {
      throw new Error(await openAlert('account.nameError', t, alertController))
    }

    if (!user.value.email || !RegExps.email.exec(user.value.email)) {
      throw new Error(await openAlert('account.emailError', t, alertController))
    }

    if (!user.value.codePhone || !RegExps.codePhone.exec(user.value.codePhone)) {
      throw new Error(await openAlert('account.codePhoneError', t, alertController))
    }

    if (!user.value.phone || !RegExps.phone.exec(user.value.phone)) {
      throw new Error(await openAlert('account.phoneError', t, alertController))
    }

    if (!user.value.password || !RegExps.password.exec(user.value.password)) {
      throw new Error(await openAlert('account.incorrectPassword', t, alertController))
    }

    if (user.value.password != confirmePassword.value) {
      throw new Error(await openAlert('account.passwordConfirmeError', t, alertController))
    }

    loading.present();

    const res = await account.register();
    if (!res) {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }

    if (res.status === 400) {
      account.cleanUser() //Si el usuario existe, borramos los datos del formulario
      throw new Error(await openAlert('account.registerError', t, alertController))
    }

    if (res.status === 401) {
      account.cleanUser(); //Si el usuario existe, borramos los datos del formulario
      throw new Error(await openAlert('account.registerError', t, alertController))
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
      //Ir a cuenta, Luego de que el usuario se registre
      router.push("/tabs/mycuenta");
    } else {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }

    loading.dismiss();


  } catch (error) {
    loading.dismiss();
    console.log(error)
  }

};

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

ion-input {
  font-size: 20px;
}
</style>
