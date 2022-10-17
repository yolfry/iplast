<script lang="ts" setup>
import {
  IonPage,
  IonContent,
} from "@ionic/vue";
import AppIMC from "@/components/appIMC.vue";

</script>

<template>
  <ion-page :isInOutlet="true">
    <ion-content :fullscreen="true">
      <app-i-m-c></app-i-m-c>
    </ion-content>
  </ion-page>
</template>