<template>
  <ion-page :isInOutlet="true">
    <ion-header translucent>
      <ion-toolbar color="primary">

        <ion-avatar class=" ion-margin-start" slot="start">
          <img src="@/assets/logoApp.png">
        </ion-avatar>
        <ion-text slot="start" class=" ion-text-center ion-padding-start">
          <h2>{{ $t('title') }}</h2>
        </ion-text>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="tertiary">

      <!-- <div class="background-page" :style="`background: rgb(239, 239, 239);
      background: linear-gradient(255deg, rgb(239, 239, 239) 75%, ${colorIMC} 100%);`"></div> -->

      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <app-i-m-c></app-i-m-c>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import {
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonHeader,
  IonToolbar,
  IonText,
  IonContent,
  IonAvatar
} from "@ionic/vue";
import AppIMC from "@/components/appIMC.vue";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore()

const colorIMC = computed(() => {
  return appStore.calculator.colorIMC;
})


const doRefresh = async (e: any) => {
  console.log('reload...', e)
  e.target.complete()
}

//IOS Phone

// const doRefresh = async (e: any) => {
//   console.log('reload...', e)
//   e.target.complete()
// }


</script>


<style scoped>
/* .background-page {
  position: fixed;
  background-color: rgb(239, 239, 239);
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
  z-index: -100;
} */
</style>

<style>
ion-avatar {
  margin: 5px;
}
</style>