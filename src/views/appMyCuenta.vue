<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ $t('titles.myAccount') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mi cuenta</ion-title>
        </ion-toolbar>
      </ion-header>



      <ion-row class=" ion-padding">
        <ion-col size="12">
          <ion-text>
            <h3>{{ $t('titles.helloUser') }}, <span v-if="userAll"> {{ userAll.name }}</span></h3>
          </ion-text>
        </ion-col>
      </ion-row>

      <!-- <ion-row>
        <ion-col>
          <ion-button @click="account.logout().then(res => res ? $router.push('/') : null)">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
            Cerrar sesión
          </ion-button>
        </ion-col>
      </ion-row> -->


      <!-- <ion-row>
        <ion-col>
          <ion-button>
            <ion-icon slot="icon-only" :icon="listOutline"></ion-icon>
            My consultas
          </ion-button>
        </ion-col>
      </ion-row> -->

      <ion-row>
        <ion-col>
          <ion-list>


            <ion-item button>
              <ion-icon slot="start" :icon="peopleOutline"></ion-icon>
              <ion-label>
                <h3>Ecuentra Tu doctor</h3>
              </ion-label>
            </ion-item>

            <!--Comisung-->

            <ion-item button>
              <ion-icon slot="start" :icon="peopleOutline"></ion-icon>
              <ion-label>
                <h3>Sport Light Doctor</h3>
              </ion-label>
            </ion-item>


            <ion-item button>
              <ion-icon slot="start" :icon="settingsOutline"></ion-icon>
              <ion-label>
                <h3>Config</h3>
              </ion-label>
            </ion-item>


            <ion-item button @click="account.logout().then(res => res ? $router.push('/') : null)">
              <ion-icon slot="start" :icon="exitOutline"></ion-icon>
              <ion-label>
                <h3>Cerrar Cuenta</h3>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonText,
  IonCol
} from "@ionic/vue";
import { logOutOutline, listOutline, peopleOutline, exitOutline, settingsOutline } from "ionicons/icons";

import { computed, onMounted, onActivated, onUpdated } from "vue";
import { useAccountStore } from "@/store/account";
import { useAppStore } from "@/store/app";

const account = useAccountStore();

//User Store
const user = computed(() => {
  return account.user;
});

const userAll = computed(() => {
  return account.userAll;
});

async function getUserAll() {
  const account = useAccountStore();
  const appStore = await useAppStore();
  account.userAll = await appStore.getDataApp('userAll');
}

onMounted(() => {
  getUserAll()
});

onActivated(() => {
  getUserAll()
});

onUpdated(() => {
  getUserAll()
});

account.getUserData()


</script>
