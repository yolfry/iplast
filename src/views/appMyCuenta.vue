<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-avatar class=" ion-margin-start" slot="start">
          <img src="@/assets/logoApp.png">
        </ion-avatar>

        <ion-title>{{ $t('titles.myAccount') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="cover"></div>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('titles.myAccount') }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-row class=" ion-padding">
        <ion-col size="12">
          <ion-text>
            <h3>{{ $t('titles.helloUser') }}, <span v-if="userAll"> {{ userAll.name }}</span></h3>
          </ion-text>
        </ion-col>
      </ion-row>


      <ion-row>
        <ion-col>
          <ion-list>

            <ion-item button @click="$router.push({
              name: 'fYD'
            })" color="primary">
              <ion-icon slot="start" :icon="peopleCircle"></ion-icon>
              <ion-label>
                <h3>{{ $t('user.findYourDoctor') }}</h3>
              </ion-label>
            </ion-item>

            <!--Comisung-->

            <ion-item button @click="$router.push({
              name: 'sLD'
            })" color="primary">
              <ion-icon slot="start" :icon="sparklesSharp"></ion-icon>
              <ion-label>
                <h3>{{ $t('user.sportLightDoctor') }}</h3>
              </ion-label>
            </ion-item>


            <ion-item button @click="$router.push({
              name: 'config'
            })" color="primary">
              <ion-icon slot="start" :icon="settingsSharp"></ion-icon>
              <ion-label>
                <h3>{{ $t('user.config') }}</h3>
              </ion-label>
            </ion-item>

            <ion-item button @click="logout()" color="primary">
              <ion-icon slot="start" :icon="exitSharp"></ion-icon>
              <ion-label>
                <h3>{{ $t('user.exitAccount') }}</h3>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>


      <!-- <div class=" ion-padding">Esta es mi cuenta {{ user }}</div>
      <div class=" ion-padding">{{ userAll }}</div> -->
    </ion-content>
  </ion-page>
</template>

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
  IonText,
  IonCol,
  IonAvatar
} from "@ionic/vue";//<ion-icon name="sparkles-outline"></ion-icon>
import { peopleCircle, exitSharp, settingsSharp, sparklesSharp } from "ionicons/icons";

import { computed } from "vue";
import { useAccountStore } from "@/store/account";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { alertController } from "@ionic/vue";

const account = useAccountStore();
const router = useRouter();
//User Store
const user = computed(() => {
  return account.user;
});

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
            router.push({
              name: 'login'
            })
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
</style>
