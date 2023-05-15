
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
  IonIcon,
  IonText,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  useIonRouter,
  isPlatform,
  IonToggle,
  IonCard,
  IonCardHeader
} from "@ionic/vue";
import { peopleCircle, exitSharp, settingsSharp, sparklesSharp, informationCircle, server, link, logIn, sunny, moon, alarm } from "ionicons/icons";

import { computed, onBeforeUpdate } from "vue";
import { useAccountStore } from "@/store/account";
import { useI18n } from "vue-i18n";
import { alertController } from "@ionic/vue";
import { useAppStore } from "@/store/app";
import { changeTheme } from "@/ts/dark";


const account = useAccountStore();
const appStore = useAppStore()
const router = useIonRouter();


onBeforeUpdate(() => {
  console.log('Update')
})

const doRefresh = async (e: any) => {
  await account.getUserData();
  e.target.complete();
}

const { t } = useI18n();


const userAll = computed(() => {
  return account.userAll;
});

const logout = async (): Promise<void> => {

  const alert = await alertController.create({
    header: "Alert",
    message: t("account.logout"),
    buttons: [
      {
        text: t('text.no'),
        role: "cancel",
        handler: () => {
          console.log('cancel')
        }
      },
      {
        text: t('text.yes'),
        handler: async () => {

          const res = await account.logout()

          if (res) {
            router.push('/tabs/login')
          } else {
            console.log('Log Out Error')
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
      <ion-toolbar :color="!appStore.isDark ? `primary` : ``">

        <ion-title slot="start">{{ $t('titles.myAccount') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="gradient-primary" :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>


      <ion-row v-if="account.user.keyUser" class=" ion-padding">
        <ion-col size="12">
          <ion-text>
            <h3>{{ $t('titles.helloUser') }}, <span v-if="userAll"> {{ userAll.name }}</span></h3>
          </ion-text>
        </ion-col>
      </ion-row>


      <ion-row>
        <ion-col size="6">

          <ion-card mode="ios" @click="router.push({
            name: 'config'
          })" button class="y-translucent">
            <ion-card-header>
              <ion-icon color="dark" size="large" :icon="settingsSharp"></ion-icon>
              <ion-text color="dark">
                <h6>{{ $t('user.config')
                }}</h6>
              </ion-text>
            </ion-card-header>
          </ion-card>
        </ion-col>

        <ion-col size="6">
          <ion-card mode="ios" @click="router.push({
              name: 'accountdata'
            })" button class="y-translucent">
            <ion-card-header>
              <ion-icon color="dark" size="large" :icon="server"></ion-icon>
              <ion-text color="dark">
                <h6>{{ $t('user.accountData')
                }}</h6>
              </ion-text>
            </ion-card-header>
          </ion-card>
        </ion-col>

        <ion-col size="6">
          <ion-card mode="ios" @click="router.push({
              name: 'alarme'
            })" button class="y-translucent">
            <ion-card-header>
              <ion-icon color="dark" size="large" :icon="alarm"></ion-icon>
              <ion-text color="dark">
                <h6>{{ $t('text.alarme') }}</h6>
              </ion-text>
            </ion-card-header>
          </ion-card>
        </ion-col>

        <ion-col size="6">
          <ion-card mode="ios" @click="router.push({
            name: 'references'
          })" button class="y-translucent">
            <ion-card-header>
              <ion-icon color="dark" size="large" :icon="link"></ion-icon>
              <ion-text color="dark">
                <h6>{{ $t('text.references')
                }}</h6>
              </ion-text>
            </ion-card-header>
          </ion-card>
        </ion-col>


        <ion-col mode="ios" size="6">
          <ion-card button class="y-translucent" @click="changeTheme(!appStore.isDark, true)">
            <ion-card-header class=" ion-text-center">
              <ion-icon size="large" :icon="appStore.isDark ? moon : sunny"
                style="color: var(--ion-color-dark);"></ion-icon>
              <ion-toggle class=" ion-padding-start" color="tertiary" :checked="appStore.isDark"></ion-toggle>
            </ion-card-header>
          </ion-card>
        </ion-col>
      </ion-row>


      <!--Items Opcion Menu-->

      <ion-item button @click="router.push({
        name: 'fYD'
      })" color="medium">
        <ion-icon slot="start" :icon="peopleCircle"></ion-icon>
        <ion-label>
          <ion-text class="textItem">
            {{ $t('user.findYourDoctor') }}
          </ion-text>
        </ion-label>
      </ion-item>



      <ion-item button @click="router.push({
        name: 'sLD'
      })" color="medium">
        <ion-icon slot="start" :icon="sparklesSharp"></ion-icon>
        <ion-label class="textItem">
          {{ $t('user.sportLightDoctor') }}
        </ion-label>
      </ion-item>



      <ion-item v-if="account.user.keyUser" button @click="logout()" color="secondary">
        <ion-icon slot="start" :icon="exitSharp"></ion-icon>
        <ion-label class="textItem">
          {{ $t('user.exitAccount') }}
        </ion-label>
      </ion-item>

      <ion-item v-else button @click="router.push({
        name: 'login'
      })" color="secondary">
        <ion-icon slot="start" :icon="logIn"></ion-icon>
        <ion-label class="textItem">
          {{ $t('titles.login') }}
        </ion-label>
      </ion-item>



      <ion-item color="tertiary" mode="ios">
        <ion-icon slot="start" :icon="informationCircle" color="primary"></ion-icon>
        <ion-label class="textItem">
          {{ $t('app.version') }} v{{ isPlatform('ios') ? appStore.versionIos : appStore.version }}
        </ion-label>
      </ion-item>



    </ion-content>
  </ion-page>
</template>
