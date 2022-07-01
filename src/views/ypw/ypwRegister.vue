<template>
  <ion-page>
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

      <ion-grid class="ion-margin-top">
        <!-- <div class="videoShadow"></div> -->
        <!-- <video autoplay loop muted playsinline>
        <source src="@/views/ypw/assets/videoCover.mp4" type="video/mp4" />
      </video> -->
        <div class="cover"></div>
        <ion-row class="animate__animated animate__bounceInLeft ion-justify-content-center">
          <ion-col size-lg="6" size-sm="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  <ion-icon @click="$router.back()" :icon="chevronBackOutline"></ion-icon>
                </ion-card-title>
                <ion-row class="ion-justify-content-center ion-text-center">
                  <ion-avatar>
                    <img src="@/assets/logoApp.png" />
                  </ion-avatar>
                  <!-- <ion-avatar>
                    <img src="@/views/ypw/assets/logoYPW.com.jpg" />
                  </ion-avatar> -->
                </ion-row>
                <!-- <ion-card-title class="ion-text-center">
                  Crear tu cuenta
                </ion-card-title> -->
                <ion-text class="ion-text-center" color="primary">
                  <h3>Crear tu cuenta</h3>
                </ion-text>

              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">

                    <!--Data register Input Entrada-->
                    <ion-input v-model="user.username" type="text" placeholder="Usuario"></ion-input>
                    <ion-input v-model="user.name" type="text" placeholder="Nombre"></ion-input>
                    <ion-input v-model="user.email" type="text" placeholder="Email"></ion-input>
                    <ion-input v-model="user.phone" type="text" placeholder="Numero"></ion-input>
                    <ion-input v-model="user.password" type="password" placeholder="Contraseña"></ion-input>

                    <div class="ion-padding-bottom ion-padding-top">
                      <ion-button color="primary" @click="account.register()">Siguiente</ion-button>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
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
  IonPage,
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import "animate.css";
import { watch } from "vue";

import { computed } from "@vue/reactivity";

//Logica
import { accountStore } from "@/store/account";
import { useRouter } from "vue-router";
const router = useRouter()

const account = accountStore();

const user = computed(() => {
  return account.user;
});

watch(account.user, (newData) => {
  if (newData.keyUser && newData.appConnect) {
    router.push({
      path: '/taps/tab4'
    })
  }
})


// async function login() {
//   account.setUser()
//   router.push({
//     path: '/'
//   })

// }
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
}

ion-input {
  font-size: 20px;
  border-bottom: 0.1px solid var(--ion-color-dark);
  margin-top: 5px;
  padding-left: 10px;
}
</style>
