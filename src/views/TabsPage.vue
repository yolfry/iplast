<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/novedad">
          <ion-icon :icon="imageOutline" />
          <ion-label>Novedad</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/doctor">
          <ion-icon :icon="callOutline" />
          <ion-label>Doctor</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/mycuenta">
          <ion-icon :icon="personOutline" />
          <ion-label>Cuenta</ion-label>
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
  callOutline,
  homeOutline,
  imageOutline,
  personOutline,
} from "ionicons/icons";
</script>
