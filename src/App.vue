<script lang="ts" setup>
import { IonApp } from '@ionic/vue';
import { onMounted } from 'vue';
import AppHome from './views/appHome.vue';

onMounted(async () => {
  console.log('Developers Yolfry Bautista and YPW S.T.L  ... Ready App ')
})

</script>


<template>
  <ion-app>
    <app-home></app-home>
  </ion-app>

</template>

