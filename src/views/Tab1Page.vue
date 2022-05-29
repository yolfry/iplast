<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Manuel Belen App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Manuel Belen App</ion-title>
        </ion-toolbar>
      </ion-header>

      <!--/wp-json/wp/v2/posts-->

      <app-post-vue></app-post-vue>

      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";
import appPostVue from "@/components/appPost.vue";

export default defineComponent({
  name: "Tab1Page",
  components: {
    // ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    appPostVue,
  },
});
</script>
