<script lang="ts" setup>
import {
  IonPage,
  IonTitle,
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

const appStore = useAppStore()


const doRefresh = async (e: any) => {
  appStore.calculator.edadPeople = undefined
  appStore.calculator.altura = {
    m: null,
    ft: null,
    in: null,
    cm: null
  }

  appStore.calculator.peso = {
    kg: null,
    lb: null,
    st: null
  }
  e.target.complete()
}

</script>

<template>
  <ion-page :isInOutlet="true">
    <ion-content :fullscreen="true" color="tertiary">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <app-i-m-c></app-i-m-c>
    </ion-content>
  </ion-page>
</template>



<style scoped>
ion-avatar {
  width: 40px;
  height: 40px;
}
</style>

<style>
ion-avatar {
  margin: 5px;
}
</style>