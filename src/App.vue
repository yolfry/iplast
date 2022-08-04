<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>

</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';


// import { useAppStore } from '@/store/app';




// const AppStore = useAppStore();

// AppStore.chargeLanguaje('en')




// const appStore = useAppStore()
// i18n.locale  = appStore.locale




const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});

</script>