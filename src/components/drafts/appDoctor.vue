<template>
    <ion-grid class=" ion-padding">

        <ion-row>
            <ion-col class="ion-justify-content-center">

                <ion-text class=" ion-text-center" color="primary">
                    <h2>DR. MANUEL BELEN</h2>
                </ion-text>

                <div class=" ion-padding">
                    <ion-button shape="round" target="__Tel" href="tel:+1 (829) 545 4401" color="primary">Llamar
                    </ion-button>
                </div>
            </ion-col>
        </ion-row>

        <ion-row class=" ion-justify-content-center">
            <ion-col size="9">
                <img class=" redondo" src="/assets/Dr-Manuel-Belen.jpg" />
            </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center">
            <ion-col v-if="!page" size="3">
                <ion-spinner></ion-spinner>
            </ion-col>
            <ion-col v-else size="12" class=" ion-padding">
                <div v-html="page.excerpt.rendered"></div>
                <a :href="page.link" target="__Web">Leer más</a>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col>
                <ion-button>
                    <ion-icon slot="icon-only" :icon="listOutline"></ion-icon>
                    My consultas
                </ion-button>
            </ion-col>
        </ion-row>

    </ion-grid>

    <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button target="__whatsapp" href="https://wa.me/18498815575?text=" color="success">
            <ion-icon :icon="logoWhatsapp"></ion-icon>
        </ion-fab-button>
    </ion-fab>

</template>

<script lang="ts" setup>
import { IonGrid, IonFab, IonFabButton, IonIcon, IonCol, IonText, IonButton, IonRow, IonSpinner } from '@ionic/vue';
import { logoWhatsapp, listOutline } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/store/app';

import axios from 'axios';

//Ref 
const page = ref()

onMounted(async () => {
    try {
        const appStore = useAppStore()

        //Cargar Local
        page.value = await appStore.getDataApp('page')
        const response = await axios.get('https://www.manuelbelen.com/dev/es/wp-json/wp/v2/pages/1032/?_embed')

        if (response.status == 200 || response.status == 201) {

            // console.log(response.data)
            // page.value = response.data.excerpt.rendered
            // linkPage.value = response.data.link

            page.value = response.data

            //Guardar en Local
            appStore.saveDataApp('page', response.data)


        } else {
            throw new Error(response.statusText)
        }
    } catch (error) {
        console.log(error)
    }
});

</script>


<style scoped>
img[class="redondo"] {
    border-radius: 20%;
}
</style>