<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-avatar class=" ion-margin-start" slot="start">
          <img src="@/assets/logoApp.png">
        </ion-avatar>
        <ion-title>{{ $t('titles.news') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('titles.news') }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <app-post-vue></app-post-vue>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import appPostVue from "@/components/appPost.vue";

import { IonPage, IonHeader, IonToolbar, IonTitle, IonAvatar, IonContent } from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
