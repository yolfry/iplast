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
  IonAvatar,
} from "@ionic/vue";
import AppIMC from "@/components/appIMC.vue";
import { useAppStore } from "@/store/app";
import scrollFabButton from "@/components/scrollFabButton.vue";
import { onMounted } from "vue";
const appStore = useAppStore()

const doRefresh = async (e: any) => {
  appStore.calculator.edadPeople = undefined
  appStore.calculator.altura = {
    m: null,
    ft: null,
    in: null,
    cm: null
  }


  appStore.calculator.excedenteIMC = 35 //default 35


  appStore.calculator.peso = {
    kg: null,
    lb: null,
    st: null
  }
  e.target.complete()
}

onMounted(async () => {
})


</script>

<template>
  <ion-page :isInOutlet="true">
    <ion-header translucent>
      <ion-toolbar :color="!appStore.isDark ? `primary` : ``">

        <ion-avatar size=" smol" class=" ion-margin-start ion-justify-content-center" slot="start">
          <img src="@/assets/logoApp.png">
        </ion-avatar>
        <ion-text slot="start" class=" ion-text-center ion-padding-start">
          <ion-title>
            {{ $t('title') }}
          </ion-title>
        </ion-text>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <scrollFabButton></scrollFabButton>
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