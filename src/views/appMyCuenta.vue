
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
  IonRefresher,
  IonRefresherContent,
  useIonRouter
} from "@ionic/vue";
import { peopleCircle, exitSharp, settingsSharp, sparklesSharp, informationCircle, server, link, logIn } from "ionicons/icons";


import { computed } from "vue";
import { useAccountStore } from "@/store/account";
import { useI18n } from "vue-i18n";
import { alertController } from "@ionic/vue";
import paises from "@/ts/paises";

const account = useAccountStore();
const router = useIonRouter();


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
  

<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">

        <ion-title slot="start">{{ $t('titles.myAccount') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="cover-box"></div>

      <ion-row v-if="account.user.keyUser" class=" ion-padding">
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
            })" color="secondary">
              <ion-icon slot="start" :icon="peopleCircle"></ion-icon>
              <ion-label>
                <ion-text class="textItem">
                  {{ $t('user.findYourDoctor') }}
                </ion-text>
              </ion-label>
            </ion-item>

            <!--Comisung-->

            <ion-item button @click="$router.push({
              name: 'sLD'
            })" color="secondary">
              <ion-icon slot="start" :icon="sparklesSharp"></ion-icon>
              <ion-label class="textItem">
                {{ $t('user.sportLightDoctor') }}
              </ion-label>
            </ion-item>


            <ion-item button @click="$router.push({
              name: 'config'
            })" color="secondary">
              <ion-icon slot="start" :icon="settingsSharp"></ion-icon>
              <ion-label class="textItem">
                {{ $t('user.config') }}
              </ion-label>
            </ion-item>

            <ion-item button @click="$router.push({
              name: 'accountdata'
            })" color="secondary">
              <ion-icon slot="start" :icon="server"></ion-icon>
              <ion-label class="textItem">
                {{ $t('user.accountData') }}
              </ion-label>
            </ion-item>

            <ion-item button @click="$router.push({
              name: 'references'
            })" color="secondary">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                {{ $t('text.references') }}
              </ion-label>
            </ion-item>



            <ion-item v-if="account.user.keyUser" button @click="logout()" color="secondary">
              <ion-icon slot="start" :icon="exitSharp"></ion-icon>
              <ion-label class="textItem">
                {{ $t('user.exitAccount') }}
              </ion-label>
            </ion-item>

            <ion-item v-else button @click="$router.push({
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
                {{ $t('app.version') }}
              </ion-label>
            </ion-item>

          </ion-list>
        </ion-col>
      </ion-row>

    </ion-content>
  </ion-page>
</template>

