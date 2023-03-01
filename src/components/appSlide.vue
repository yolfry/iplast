<script lang="ts" setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonContent, IonPage, IonText, IonButton, IonRow, IonCol } from '@ionic/vue';
import { Pagination } from "swiper";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import "swiper/css/pagination";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n()


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
                <swiper-slide class="swiper-slide-content-1">
                    <IonText color="tertiary" class=" ion-padding">
                        <template v-if="locale == 'es'">
                            <div class="_logoSlide"><img class="logoSlide" src="@/assets/iconIplast.png" /></div>
                            <h1>Bienvenido a Iplast</h1>
                            <h3>Aplicación especializada en el cálculo del índice de masa corporal (IMC) y cirugía plástica.
                                Vamos a descubrir si calificas.</h3>
                            <h2>¡Comencemos!</h2>
                        </template>

                        <template v-if="locale == 'en'">
                            <div class="_logoSlide"><img class="logoSlide" src="@/assets/iconIplast.png" /></div>
                            <h1>Welcome to Iplast</h1>
                            <h3>Specialized application for calculating Body Mass Index (BMI) and plastic surgery.
                                Let's find out if you qualify.</h3>
                            <h2>Let's get started!</h2>
                        </template>


                        <template v-if="locale == 'fr'">
                            <div class="_logoSlide"><img class="logoSlide" src="@/assets/iconIplast.png" /></div>
                            <h1>Bienvenue à Iplast</h1>
                            <h3>Application spécialisée dans le calcul de l'indice de masse corporelle (IMC) et la chirurgie
                                plastique.
                                Découvrons si vous êtes éligible.</h3>
                            <h2>Commençons!</h2>
                        </template>
                    </IonText>
                </swiper-slide>
                <swiper-slide class="swiper-slide-content-2">
                    <ion-row>
                        <ion-col size="12">
                            <template v-if="locale == 'es'">
                                <IonText color="tertiary" class=" ion-padding">
                                    <h1>Usar Iplast es fácil</h1>
                                    <p>Solo agregas tu edad y estatura</p>
                                </IonText>
                            </template>

                            <template v-if="locale == 'en'">
                                <IonText color="tertiary" class=" ion-padding">
                                    <h1>Using Iplast is easy</h1>
                                    <p>You just add your age and height</p>
                                </IonText>
                            </template>

                            <template v-if="locale == 'fr'">
                                <IonText color="tertiary" class=" ion-padding">
                                    <h1>Utiliser Iplast est facile</h1>
                                    <p>Vous ajoutez simplement votre âge et votre taille</p>
                                </IonText>
                            </template>
                        </ion-col>
                        <ion-col size="12">
                            <img style="width: 35%;" src="@/assets/arrow-bak-02.svg" class="arrow-bak">
                            <video class="slideIntro" loop :controls="true" name="media" autoplay>
                                <source v-if="locale == 'es'" src="@/assets/slideIntro.webm" type="video/webm">
                                <source v-if="locale == 'en'" src="@/assets/slideIntro.webm" type="video/webm">
                                <source v-if="locale == 'fr'" src="@/assets/slideIntro.webm" type="video/webm">
                            </video>
                        </ion-col>
                    </ion-row>
                </swiper-slide>
                <swiper-slide class="swiper-slide-content-3">

                    <ion-row>
                        <ion-col size="12">
                            <IonText color="primary" class=" ion-padding">
                                <h1>{{ $t('text.go') }}</h1>
                            </IonText>
                        </ion-col>
                        <ion-col size="12">
                            <video class="slideLogoVideo" loop :controls="false" name="media" autoplay>
                                <source src="@/assets/logoVideoSlideStart.webm" type="video/webm">
                            </video>
                        </ion-col>
                        <ion-col size="12">
                            <IonButton @click="close()" fill="outline" mode="ios"> {{ $t('text.ok') }} </IonButton>
                        </ion-col>
                    </ion-row>

                </swiper-slide>
            </swiper>
        </ion-content>
    </ion-page>
</template>



<style scoped>
.slideIntro {
    width: 70%;
    border-radius: 10%;
}

.slideLogoVideo {
    width: 80%;
    border-radius: 11rem;
}

.arrow-bak {
    position: absolute;
    display: block;
    z-index: 3000;
    top: -18%;
    left: -3%;
}

.swiper {
    width: 100%;
    height: 100%;
}

.logoSlide {
    position: absolute;
    top: 8%;
    animation: float 6s ease-in-out infinite;
}



.swiper-slide-content-1 {
    background-image: url("@/assets/backgroudSlide.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: 51%;
}

.swiper-slide-content-2 {
    background-image: url("@/assets/backgroudSlide-2.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: 10%;
}

.swiper-slide-content-3 {
    background-color: #e7effeea;
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
