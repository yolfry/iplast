<template>
  <!-- <ion-header>
    <ion-toolbar>
      <ion-title> Ypw Login </ion-title>
    </ion-toolbar>
  </ion-header> -->

  <ion-content :fullscreen="true">
    <!-- <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Ypw Login</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-grid>
      <div>
        <video width="400" controls Autoplay="autoplay">
          <source src="@/views/ypw/assets/videoCoverYpw.mov" type="video/mov" />
        </video>
      </div>
      <div class="cover"></div>
      <ion-row class="animate__animated animate__bounceInLeft">
        <ion-col size="12">
          <ion-card>
            <ion-card-header>
              <ion-card-title
                ><ion-icon
                  @click="$router.back()"
                  :icon="chevronBackOutline"
                ></ion-icon>
              </ion-card-title>
              <ion-row class="ion-justify-content-center ion-text-center">
                <ion-avatar>
                  <img src="@/assets/logoApp.jpg" />
                </ion-avatar>
                <ion-avatar>
                  <img src="@/views/ypw/assets/logoYPW.com.jpg" />
                </ion-avatar>
              </ion-row>
              <ion-card-title class="ion-text-center"> Acceder </ion-card-title>
              <ion-row class="ion-justify-content-center">
                <ion-text>
                  <span>Usa tu Cuenta de Ypw</span>
                </ion-text>
              </ion-row>
            </ion-card-header>

            <ion-card-content>
              <ion-row>
                <ion-col
                  size="12"
                  class="ion-padding ion-justify-content-center"
                >
                  <ion-input
                    type="text"
                    placeholder="Email, número, usuario"
                  ></ion-input>
                  <ion-input
                    type="password"
                    placeholder="Contraseña"
                  ></ion-input>

                  <div class="ion-padding-bottom ion-padding-top">
                    <ion-button color="primary">Siguiente</ion-button>
                    <ion-button fill="outline" color="secundary"
                      >Crear cuenta</ion-button
                    >
                  </div>
                  <div class="ion-padding ion-text-center">
                    <a href="https://ypw.com.do" color="secundary"
                      >Olvide mi cuenta</a
                    >
                  </div>
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonGrid,
  IonContent,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCol,
  IonInput,
  IonButton,
  IonIcon,
  IonAvatar,
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import "animate.css";
</script>

<style scoped>
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("@/views/ypw/assets/coverPresaDeHatilloYPW.gif");
  opacity: 0.6;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

ion-grid > ion-row {
  margin-top: 40%;
}

ion-card {
  background-color: var(--ion-color-login-card);
}

ion-input {
  font-size: 20px;
  border-bottom: 0.1px solid var(--ion-color-dark);
  margin-top: 5px;
  padding-left: 10px;
}
</style>
