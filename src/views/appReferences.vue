
<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonCol,
  IonButtons,
  IonBackButton
} from "@ionic/vue";
import { link } from "ionicons/icons";


const appStore = useAppStore()
</script>
  

  

<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar :color="!appStore.isDark ? `primary` : ``">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title slot="start">{{ $t('text.references') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-row>
        <ion-col>
          <ion-list>


            <ion-item button target="_blank" href="https://academic.oup.com/asj/article/36/6/718/2664472">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                academic.oup.com
              </ion-label>
            </ion-item>

            <ion-item button target="_blank" href="https://www.cdc.gov/obesity/basics/adult-defining.html">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                cdc.gov
              </ion-label>
            </ion-item>

            <ion-item button target="_blank" href="https://www.mdpi.com/2077-0383/10/23/5665/htm">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                mdpi.com
              </ion-label>
            </ion-item>

            <ion-item button target="_blank"
              href="https://theplasticsurgerygroup.com/wp-content/uploads/2017/05/BMI-chart.pdf">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                theplasticsurgerygroup.com
              </ion-label>
            </ion-item>

            <ion-item button target="_blank"
              href="https://www.researchgate.net/publication/310480470_The_Effect_of_Body_Mass_Index_on_Outcome_of_Abdominoplasty_Operations">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                researchgate.net
              </ion-label>
            </ion-item>

            <ion-item button target="_blank" href="https://cosmetassure.com/wp-content/uploads/2016/01/Overweight.pdf">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                cosmetassure.com
              </ion-label>
            </ion-item>

            <ion-item button target="_blank" href="https://www.ciplastica.com/ojs/index.php/rccp/article/view/70">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                ciplastica.com
              </ion-label>
            </ion-item>

            <ion-item button target="_blank"
              href="https://scielo.conicyt.cl/pdf/rchcir/v70n3/0718-4026-rchcir-70-03-0257.pdf">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                scielo.conicyt.cl
              </ion-label>
            </ion-item>

            <ion-item button target="_blank" href="https://cliniquedallas.com/bmi-como-influye-su-peso-en-su-cirugia/">
              <ion-icon slot="start" :icon="link"></ion-icon>
              <ion-label class="textItem">
                cliniquedallas.com
              </ion-label>
            </ion-item>

          </ion-list>
        </ion-col>
      </ion-row>

    </ion-content>
  </ion-page>
</template>


<style scoped>
.textItem {
  font-size: 20px;
  color: var(--ion-color-primary);
}

ion-item {
  margin-bottom: 2px;
}
</style>
    
<style>
ion-avatar {
  margin: 5px;
}
</style>

