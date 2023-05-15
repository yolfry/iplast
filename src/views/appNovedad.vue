

<script lang="ts" setup>
import appPostVue from "@/components/appPost.vue";

import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonAvatar, IonContent, IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";

import { useWordpressStore } from "@/store/wordpress";
import { useI18n } from "vue-i18n";
import { onActivated, onMounted } from "vue";
import { showRewardVideo } from "@/ts/admob.js";
import { useAppStore } from "@/store/app";

const appStore = useAppStore()
const wordpressStore = useWordpressStore();
const i18n = useI18n();

const doRefresh = async (e: any) => {
  await wordpressStore.getPost(i18n.locale.value);
  // console.log('reload...', e)
  e.target.complete();
}

onMounted(async () => {
  await showRewardVideo()
})

onActivated(async () => {
  await showRewardVideo()
})


</script>


<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
        <!-- < ion - avatar class=" ion-margin-start" slot="start">
        <img src="@/assets/logoApp.png">
        </ion-avatar> -->
        <ion-title>{{ $t('titles.news') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <app-post-vue></app-post-vue>
    </ion-content>
  </ion-page>
</template>

