<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Manuel Belen App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!--/wp-json/wp/v2/posts  @ionRefresh="doRefresh($event)"-->

      <!-- <ion-refresher slot="fixed">
        <ion-refresher-content> </ion-refresher-content>
      </ion-refresher> -->

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Manuel Belen App</ion-title>
        </ion-toolbar>
      </ion-header>

      <app-i-m-c></app-i-m-c>

      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
// import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  // IonRefresher,
  // IonRefresherContent,
} from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";
import AppIMC from "@/components/appIMC.vue";
</script>
