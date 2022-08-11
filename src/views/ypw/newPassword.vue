<template>
  <ion-page>

    <ion-content :fullscreen="true">

      <ion-grid class="ion-margin-top">
        <div class="cover"></div>
        <ion-row class="animate__animated animate__zoomIn ion-justify-content-center">
          <ion-col size-lg="6" size-sm="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title @click="$router.back()">

                  <ion-icon :icon="chevronBackOutline"></ion-icon> {{ $t('text.back') }}
                </ion-card-title>
                <ion-row class="ion-justify-content-center ion-text-center">
                  <ion-avatar>
                    <img src="@/assets/logoApp.png" />
                  </ion-avatar>
                  <!-- <ion-avatar>
                    <img src="@/views/ypw/assets/logoYPW.com.jpg" />
                  </ion-avatar> -->
                </ion-row>
                <ion-card-title class="ion-text-center">
                  Cambiar Contraseña
                </ion-card-title>
                <!-- <ion-row class="ion-justify-content-center">
                  <ion-text>
                    <span>Usa tu Cuenta</span>
                  </ion-text>
                </ion-row> -->
              </ion-card-header>

              <ion-card-content>
                <ion-row>
                  <ion-col size="12" class="ion-padding ion-justify-content-center">

                    <ion-input v-model="user.password" type="password" placeholder="Nueva Contraseña"></ion-input>

                    <div class="ion-padding-bottom ion-padding-top">
                      <ion-button @click="account.chargePassword()" color="primary">Cambiar</ion-button>
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
  // IonText,
  IonCol,
  IonInput,
  IonButton,
  IonIcon,
  IonAvatar,
  IonPage
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import "animate.css";
// import { ref } from "vue";

import { computed } from "@vue/reactivity";
import { watch } from "vue";


//Logica
import { useAccountStore } from "@/store/account";
import { useRouter } from "vue-router";
const router = useRouter()

const account = useAccountStore();

const user = computed(() => {
  return account.user;
});



watch(account, (newData) => {
  if (newData.chargePasswordResult == true) {
    router.push({
      path: '/account/login'
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

ion-grid {
  margin-top: 40%;
}

ion-input {
  font-size: 20px;
  border-bottom: 0.1px solid var(--ion-color-dark);
  margin-top: 5px;
  padding-left: 10px;
}
</style>
