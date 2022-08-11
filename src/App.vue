<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>

</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
import { onMounted } from 'vue';




onMounted(async () => {
  console.log('Developers Yolfry Bautista and YPW S.T.L  ... Ready App ')
})



//Atras Back Boton
const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});

</script>