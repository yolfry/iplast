
<script lang="ts" setup>
import {
  IonGrid,
  IonContent,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCol,
  IonInput,
  IonButton,
  IonButtons,
  IonAvatar,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonHeader,
  useIonRouter

} from "@ionic/vue";

import { onMounted, computed, ref } from "vue";
import { alertController, loadingController } from "@ionic/vue";
import { useI18n } from "vue-i18n";
import openAlert from "@/ts/openAlert";

//Logica
import { useAccountStore } from "@/store/account";
import regExps from "@/ts/RegExps";
import { useAppStore } from "@/store/app";
import appSocialLogin from '@/components/appSocialLogin.vue'

const ionRouter = useIonRouter();
const account = useAccountStore();
const appStore = useAppStore()

const user = computed(() => {
  return account.user;
});

//Use
const { t } = useI18n();


const noLogin = ref(0)


//Metodos
async function login() {

  const loading = await loadingController.create({
    cssClass: 'my-custom-class',
    message: t('account.loading')
  });

  try {

    if (!user.value.username) {
      throw new Error(await openAlert('account.hiddenInputUsername', t, alertController))
    } else if (!regExps.email.exec(user.value.username) && !regExps.phone.exec(user.value.username) && !regExps.username.exec(user.value.username)) {
      throw new Error(await openAlert('account.userNameError', t, alertController))
    } else if (!user.value.password || !regExps.password.exec(user.value.password)) {
      throw new Error(await openAlert('account.incorrectPassword', t, alertController))
    } else if (!user.value.numberCode || !regExps.numberCode.exec(user.value.numberCode)) {
      throw new Error(await openAlert('account.numberCodeError', t, alertController))
    }

    await loading.present()

    const res = await account.login()

    //Ocurrio un error en la aplicacion
    if (!res) {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }

    if (res.status === 400) {
      noLogin.value++
      account.user.password = '' //Limpiar password
      throw new Error(await openAlert('account.errorUser', t, alertController))
    }

    if (res.status === 401) {
      noLogin.value++
      account.user.password = '' //Limpiar password
      throw new Error(await openAlert('account.errorUser', t, alertController))
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
      ionRouter.push('/tabs/mycuenta')

    } else {
      throw new Error(await openAlert('account.errorApp', t, alertController))
    }


    await loading.dismiss()


  } catch (error) {


    if (noLogin.value > 5) {
      noLogin.value = 0
      ionRouter.push('passwordRecovery')
    }
    loading.dismiss()
    console.log(error);
  }


}

onMounted(() => {
  user.value.password = undefined;
  user.value.username = undefined;
})


</script>


<template>
  <ion-page>

    <ion-header translucent>
      <ion-toolbar :color="!appStore.isDark ? `primary` : ``">

        <ion-buttons slot="start">
          <ion-back-button :text="$t('text.back')" defaultHref="/"></ion-back-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>


    <ion-content :fullscreen="true">

      <div class="cover-box"></div>

      <ion-grid class="ion-margin-top">

        <!--animate__animated animate__zoomIn -->
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
                  {{ $t('account.access') }}
                </ion-card-title>
                <ion-row class="ion-justify-content-center">
                  <ion-text>
                    <span>{{ $t('account.useYourAcoount') }}</span>
                  </ion-text>
                </ion-row>
              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">

                    <ion-row>
                      <ion-col v-if="user.username != null && /^\d{1,4}(([.-\s]?\d{1,4}[.-\s]?)?)*$/.exec(user.username)"
                        size="2">
                        <ion-input name="countryCode" :maxlength="5" inputmode="numeric" autocomplete="tel-country-code"
                          type="text" v-model="user.numberCode" class=" ion-align-self-center" placeholder="+1">
                        </ion-input>
                      </ion-col>
                      <ion-col class=" ion-align-self-auto">
                        <ion-input v-model="user.username" autocomplete="email" type="email" inputmode="email"
                          :placeholder="$t('account.placeholder.usernamePhoneEmail')"></ion-input>
                      </ion-col>
                      <ion-col size="12" class="ion-align-self-auto">
                        <ion-input v-model="user.password" type="password" autocomplete="current-password"
                          :placeholder="$t('account.placeholder.password')"></ion-input>
                      </ion-col>
                    </ion-row>

                    <div class="ion-padding-bottom ion-padding-top">
                      <ion-button fill="outline" router-link="/tabs/register" color="secondary">{{
                        $t('account.createAccount')
                      }}</ion-button>

                      <ion-button @click="login()" color="primary">{{ $t('account.next') }}</ion-button>
                    </div>
                    <div class="ion-padding ion-text-center">
                      <ion-text router-link="/tabs/passwordRecovery" color="secondary">{{ $t('account.forgot') }}
                      </ion-text>
                    </div>
                  </ion-col>

                  <ion-col size="12" class=" ion-text-center">
                    <ion-text>
                      <h3>{{ $t('text.or') }}</h3>
                    </ion-text>
                  </ion-col>
                  <ion-col>
                    <appSocialLogin></appSocialLogin>
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


<style scoped>
ion-grid {
  margin-top: 7%;
}

ion-input {
  font-size: 20px;
  border-bottom: 0.1px solid var(--ion-color-dark);
  margin-top: 5px;
  padding-left: 10px;
}
</style>
