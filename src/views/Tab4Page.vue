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

      <div>Esta es mi cuenta {{ user }}</div>
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

import { computed, onMounted, onBeforeUpdate } from "vue";
import { useRouter } from "vue-router";
import { accountStore } from "@/store/account";

const store = accountStore();

//User Store
const user = computed(() => {
  return store.user;
});

//User Router
const router = useRouter();

//Function Methodos
function redirectLogin() {
  router.push({
    path: "/account/login",
  });
}

// onMounted(() => {
//   if (!user.value.appConnect && !user.value.keyUser) {
//     redirectLogin();
//   }
// });

// onBeforeUpdate(() => {
//   if (!user.value.appConnect && !user.value.keyUser) {
//     redirectLogin();
//   }
// });
</script>
