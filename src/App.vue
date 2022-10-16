<script lang="ts" setup>
import { IonApp } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
import { onMounted } from 'vue';
import AppHome from './views/appHome.vue';

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


<template>
  <ion-app>
    <app-home></app-home>
  </ion-app>

</template>

