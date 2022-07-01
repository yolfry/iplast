<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Doctor
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Doctor
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <app-doctor></app-doctor>

    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import appDoctor from '@/components/appDoctor.vue'

</script>
