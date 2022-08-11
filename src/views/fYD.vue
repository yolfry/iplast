<template>
  <ion-page>
    <div class="cover"></div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('titles.findYourDoctor') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('titles.findYourDoctor') }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-row>
        <ion-col>
          <ion-card class="animate__animated animate__zoomIn">
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

          <ion-card class="animate__animated animate__zoomIn animate__delay-2s">
            <ion-card-content>
              <ion-text class=" ion-text-center">
                <h1>{{ $t('text.comingSoon') }}</h1>
              </ion-text>
            </ion-card-content>
          </ion-card>

        </ion-col>
      </ion-row>

    </ion-content>

  </ion-page>
</template>


<script lang="ts" setup>
import { IonRow, IonCol, IonButtons, IonBackButton, IonToolbar, IonHeader, IonContent, IonText, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import "animate.css";
</script>

<style scoped>
.cover {
  position: fixed;
  top: -30%;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("@/views/ypw/assets/cover.svg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

ion-card {
  z-index: 2;
}

ion-row {
  margin-top: 40%;
}
</style>
