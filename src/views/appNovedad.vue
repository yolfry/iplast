<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Novedades</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Novedades</ion-title>
        </ion-toolbar>
      </ion-header>

      <app-post-vue></app-post-vue>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import appPostVue from "@/components/appPost.vue";

import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
