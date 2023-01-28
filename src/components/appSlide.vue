<script lang="ts" setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonContent, IonPage, IonText, IonButton } from '@ionic/vue';
import { Pagination } from "swiper";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import "swiper/css/pagination";
import { useRouter } from 'vue-router';


const router = useRouter()

function close() {
    router.push('/tabs/home')
}


</script>


<template>
    <ion-page>
        <ion-content>
            <swiper :modules="[Pagination]" :pagination="{
                clickable: true,
            }">
                <swiper-slide class="swiper-slide-content">
                    <IonText color="tertiary" class=" ion-padding">
                        <div class="_logoSlide"><img class="logoSlide" src="@/assets/iconIplast.png" /></div>
                        <h1>Bienvenido a Iplast</h1>
                        <h3>Aplicación especializada en el cálculo del índice de masa corporal (IMC) y cirugía plástica.
                            Vamos a descubrir si calificas.</h3>
                        <h2>¡Comencemos!</h2>

                    </IonText>
                </swiper-slide>
                <swiper-slide class="swiper-slide-content">
                    <IonText color="tertiary">
                        <h1>Bienvenido a Iplast</h1>
                        <h3>Nuestra aplicación especializada en el cálculo del índice de masa
                            corporal (IMC) y la evaluación de la elegibilidad para cirugías plásticas.</h3>
                        <p>Con nuestra
                            herramienta fácil de usar, podrás obtener una evaluación precisa de tu IMC y saber si
                            calificas para una cirugía plástica en cuestión de minutos. ¡Comencemos!</p>

                    </IonText>
                </swiper-slide>
                <swiper-slide class="swiper-slide-content">
                    <IonText color="tertiary">
                        <h1>Bienvenido a Iplast</h1>
                        <h3>Nuestra aplicación especializada en el cálculo del índice de masa
                            corporal (IMC) y la evaluación de la elegibilidad para cirugías plásticas.</h3>
                        <p>Con nuestra
                            herramienta fácil de usar, podrás obtener una evaluación precisa de tu IMC y saber si
                            calificas para una cirugía plástica en cuestión de minutos. ¡Comencemos!</p>
                        <IonButton @click="close()" fill="outline" mode="ios"> Cerrar </IonButton>
                    </IonText>
                </swiper-slide>
            </swiper>
        </ion-content>
    </ion-page>
</template>



<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.logoSlide {
    position: absolute;
    top: 8%;
    animation: float 6s ease-in-out infinite;
}



.swiper-slide-content {
    background-image: url("@/assets/backgroudSlide.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: 51%;
}


@keyframes float {
    0% {
        transform: translatey(0px);
    }

    50% {
        transform: translatey(-20px);
    }

    100% {
        transform: translatey(0px);
    }
}
</style>
