


<script lang="ts" setup>
import { IonRow, IonCol, IonButtons, IonBackButton, IonToolbar, IonHeader, IonContent, IonText, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonTitle } from '@ionic/vue';
import { useAppStore } from '@/store/app';


const appStore = useAppStore()
</script>




<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('titles.findYourDoctor') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <div class="cover-box"></div>

      <!-- <ion-header collapse="condense">
        <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
          <ion-title size="large">{{ $t('titles.findYourDoctor') }}</ion-title>
        </ion-toolbar>
      </ion-header> -->
      <ion-row>
        <ion-col>

          <!--animate__delay-2s animate__animated animate__zoomIn-->
          <ion-card>
            <ion-card-content>
              <ion-text class=" ion-text-center">
                <h1>{{ $t('text.comingSoon') }}</h1>
              </ion-text>
            </ion-card-content>
          </ion-card>

          <!--animate__animated animate__zoomIn-->
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ $t('titles.findYourDoctor') }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-text class=" ion-text-justify">
                <h2>{{ $t('text.textComingSoonFYD1') }}</h2>
                <br />
                <h2>{{ $t('text.textComingSoonFYD2') }}</h2>
                <br />
                <h2>{{ $t('text.textComingSoonFYD3') }}</h2>
              </ion-text>
            </ion-card-content>
          </ion-card>



        </ion-col>
      </ion-row>

    </ion-content>

  </ion-page>
</template>

<style scoped>
ion-row {
  margin-top: 25%;
}
</style>