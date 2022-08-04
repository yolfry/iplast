<template>
  <ion-page>

    <ion-content :fullscreen="true">

      <ion-grid class="ion-margin-top">

        <div class="cover"></div>
        <ion-row class="animate__animated animate__bounceInLeft ion-justify-content-center">
          <ion-col size-lg="6" size-sm="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  <ion-icon @click="$router.back()" :icon="chevronBackOutline"></ion-icon>
                </ion-card-title>
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
                      <ion-label position="floating">{{ $t('account.placeholder.username') }}</ion-label>
                      <ion-input v-model="user.username" autocomplete="username" type="text"></ion-input>
                    </ion-item>



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
                          <ion-input autocomplete="tel" v-model="user.phone" type="text"></ion-input>
                        </ion-item>
                      </ion-col>
                    </ion-row>


                    <ion-row>
                      <ion-col class=" ion-align-self-auto">
                        <ion-item>
                          <ion-label position="floating">{{ $t('account.placeholder.password') }}</ion-label>
                          <ion-input v-model="user.password" type="password"></ion-input>
                        </ion-item>
                      </ion-col>
                      <ion-col size="6" class=" ion-align-self-auto">
                        <ion-item>
                          <ion-label position="floating">{{ $t('account.placeholder.confirmePassword') }}</ion-label>
                          <ion-input v-model="confirmePassword" type="password"></ion-input>
                        </ion-item>
                      </ion-col>
                    </ion-row>


                    <div class="ion-padding-bottom ion-padding-top">
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
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonInput,
  IonCardSubtitle,
  IonIcon,
  IonAvatar,
  IonPage,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import "animate.css";
import { ref } from "vue";

import { computed } from "@vue/reactivity";
import { alertController, loadingController } from "@ionic/vue";
import openAlert from "@/ts/openAlert";

import { useI18n } from "vue-i18n";

import { useAccountStore } from "@/store/account";
import { useRouter } from "vue-router";

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

    if (!user.value.username || !/^[a-zA-Z0-9@]+[._a-zA-Z0-9@]{5,34}$/.exec(user.value.username)) {
      throw new Error(await openAlert('account.userNameError', t, alertController))
    }

    loading.present();

    const register = await account.register();
    if (!register) {
      throw new Error(await openAlert('account.registerError', t, alertController))
    }
    //Ir a cuenta, Luego de que el usuario se registre
    router.push("/tabs/mycuenta");

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
