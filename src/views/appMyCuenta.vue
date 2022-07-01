<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mi cuenta</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class=" ion-padding">Esta es mi cuenta {{ user }}</div>
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
} from "@ionic/vue";

import { computed } from "vue";
import { accountStore } from "@/store/account";

const store = accountStore();

//User Store
const user = computed(() => {
  return store.user;
});
</script>
