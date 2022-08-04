<template>
  <ion-page :isInOutlet="true">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-text class=" ion-text-center">
          <h2>{{ $t('title') }}</h2>
        </ion-text>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!--/wp-json/wp/v2/posts  @ionRefresh="doRefresh($event)"-->

      <!-- <ion-refresher slot="fixed">
        <ion-refresher-content> </ion-refresher-content>
      </ion-refresher> -->

      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-text class=" ion-text-center">
            <h2>Plastic surgery calculator</h2>
          </ion-text>
        </ion-toolbar>
      </ion-header> -->

      <div class="background-page" :style="`background: rgb(239, 239, 239);
      background: linear-gradient(255deg, rgb(239, 239, 239) 75%, ${colorIMC} 100%);`"></div>
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
  IonText,
  IonContent,
  // IonRefresher,
  // IonRefresherContent,
} from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";
import AppIMC from "@/components/appIMC.vue";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore()

const colorIMC = computed(() => {
  return appStore.calculator.colorIMC;
})

</script>


<style scoped>
.background-page {
  position: fixed;
  background-color: rgb(239, 239, 239);
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
  z-index: -100;
}
</style>
