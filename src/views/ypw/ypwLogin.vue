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
                    <img src="@/assets/logoApp.jpg" />
                  </ion-avatar>
                  <ion-avatar>
                    <img src="@/views/ypw/assets/logoYPW.com.jpg" />
                  </ion-avatar>
                </ion-row>
                <ion-card-title class="ion-text-center">
                  Acceder
                </ion-card-title>
                <ion-row class="ion-justify-content-center">
                  <ion-text>
                    <span>Usa tu Cuenta de Ypw</span>
                  </ion-text>
                </ion-row>
              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">
                    <ion-input type="text" placeholder="Email, número, usuario"></ion-input>
                    <ion-input type="password" placeholder="Contraseña"></ion-input>

                    <div class="ion-padding-bottom ion-padding-top">
                      <ion-button fill="outline" @click="$router.push({
                        path: '/account/register'
                      })" color="secondary">Crear cuenta</ion-button>

                      <ion-button @click="login()" color="primary">Siguiente</ion-button>
                    </div>
                    <div class="ion-padding ion-text-center">
                      <a href="https://ypw.com.do" color="secondary">Olvide mi cuenta</a>
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

// import { computed } from "@vue/reactivity";

//Logica
import { accountStore } from "@/store/account";
import { useRouter } from "vue-router";
const router = useRouter()

const account = accountStore();

// const user = computed(() => {
//   return account.user;
// });


async function login() {
  account.setUser()
  router.push({
    path: '/'
  })

}
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

/* .videoShadow {
  display: block;
  position: fixed;
  background-color: rgba(2, 2, 2, 0.581);
  background-size: cover;
  left: 0;
  top: 0;
  right: 0;
  z-index: -2;
  bottom: 10%;
  opacity: 0.3;
  filter: blur(7px);
  border-radius: 0 0 150px 0;
} */

/* video {
  position: fixed;
  left: -75%;
  bottom: 0;
  height: 100%;
  top: 0;
  bottom: 0;
  /* filter: blur(1.5px); *
  overflow: hidden;
  z-index: -3;
}*/

ion-grid {
  margin-top: 40%;
}

/* ion-card {
  background-color: var(--ion-color-login-card);
} */

ion-input {
  font-size: 20px;
  border-bottom: 0.1px solid var(--ion-color-dark);
  margin-top: 5px;
  padding-left: 10px;
}
</style>
