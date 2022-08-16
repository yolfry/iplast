<template>
  <ion-page>
    <ion-tabs :translucent="true">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>{{ $t('tabs.home') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/novedad">
          <ion-icon :icon="imageOutline" />
          <ion-label>{{ $t('tabs.novelty') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/mycuenta">
          <ion-icon :icon="personOutline" />
          <ion-label>{{ $t('tabs.account') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  // callOutline,
  homeOutline,
  imageOutline,
  personOutline,
} from "ionicons/icons";
</script>

<style scoped>
/* ion-tab-bar {
  position: absolute;
  bottom: 2%;
  width: 90%;
  margin-left: 5%;
  border-radius: 30px;
} */
</style>
