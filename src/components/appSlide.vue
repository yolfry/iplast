<script lang="ts" setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonContent, IonPage, IonText, IonButton, IonRow, IonCol, IonIcon } from '@ionic/vue';
import { Pagination, EffectCube } from "swiper";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { closeCircle } from 'ionicons/icons';


const { locale } = useI18n()


const router = useRouter()

function close() {
    router.push('/tabs/home')
}

const play = () => {
    const tutorial = <HTMLMediaElement>document.querySelector("#tutorial")
    const logo = <HTMLMediaElement>document.querySelector('#logo')
    if (tutorial) {
        tutorial?.play()
    }
    if (logo) {
        logo?.play()
    }
}

</script>

<template>
    <ion-page>

        <ion-content>
            <ion-icon size="large" @click="close()" class="closeSlide" :icon="closeCircle"></ion-icon>
            <swiper class="swiper-slide-content-2" @slideChange="play()" :navigation="true"
                :modules="[Pagination, EffectCube]" :effect="'cube'" :grabCursor="true" :pagination="{
                    clickable: true,
                    dynamicBullets: true,
                }" :cubeEffect="{
    shadow: false,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
}">
                <swiper-slide class="swiper-slide-content-1">
                    <IonText class=" ion-padding">
                        <template v-if="locale == 'es'">
                            <div class="_logoSlide"><img style="width:25%;" class="logoSlide"
                                    src="@/assets/iconIplast.png" /></div>
                            <h1>Bienvenido a Iplast</h1>
                            <h3>Aplicación especializada en el cálculo del índice de masa corporal (IMC) y cirugía plástica.
                                Vamos a descubrir si calificas.</h3>
                        </template>

                        <template v-if="locale == 'en'">
                            <div class="_logoSlide"><img class="logoSlide" src="@/assets/iconIplast.png" /></div>
                            <h1>Welcome to Iplast</h1>
                            <h3>Specialized application for calculating Body Mass Index (BMI) and plastic surgery.
                                Let's find out if you qualify.</h3>
                        </template>


                        <template v-if="locale == 'fr'">
                            <div class="_logoSlide"><img class="logoSlide" src="@/assets/iconIplast.png" /></div>
                            <h1>Bienvenue à Iplast</h1>
                            <h3>Application spécialisée dans le calcul de l'indice de masse corporelle (IMC) et la chirurgie
                                plastique.
                                Découvrons si vous êtes éligible.</h3>
                        </template>
                    </IonText>
                </swiper-slide>
                <swiper-slide class="swiper-slide-content-2">
                    <ion-row>
                        <ion-col size="12">
                            <template v-if="locale == 'es'">
                                <IonText class=" ion-padding">
                                    <h1>Usar Iplast es fácil</h1>
                                    <p>Solo agregas tu edad, estatura y peso</p>
                                </IonText>
                            </template>

                            <template v-if="locale == 'en'">
                                <IonText class=" ion-padding">
                                    <h1>Using Iplast is easy</h1>
                                    <p>Just add your age, height and weight</p>
                                </IonText>
                            </template>

                            <template v-if="locale == 'fr'">
                                <IonText class=" ion-padding">
                                    <h1>Utiliser Iplast est facile</h1>
                                    <p>Vous ajoutez simplement votre âge, votre taille et votre poids</p>
                                </IonText>
                            </template>
                        </ion-col>
                        <ion-col size="12">
                            <!-- <img style="width: 35%;" src="@/assets/arrow-bak-02.svg" class="arrow-bak"> -->
                            <video id="tutorial" src="@/assets/tutorial.mp4" preload="auto" type="video/mp4"
                                class="slideIntro" name="tutorial" playsinline autoplay="true" loop :controls="false" muted>
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
                            <video id="logo" playsinline src="@/assets/logo.mp4" type="video/mp4" class="slideLogoVideo"
                                name="logo" autoplay="true" preload="auto" loop :controls="false" muted></video>
                        </ion-col>
                        <ion-col size="12">
                            <IonButton @click="close()" fill="outline" mode="ios" size="large"> {{ $t('text.ok') }}
                            </IonButton>
                        </ion-col>
                    </ion-row>

                </swiper-slide>
            </swiper>
        </ion-content>
    </ion-page>
</template>


<style scoped>
ion-text {
    --ion-color: var(--ion-color-slide);
}

.closeSlide {
    color: rgb(145, 166, 202);
    position: absolute;
    z-index: 30001;
    top: 8%;
    right: 4%;
}

.slideIntro {
    width: 85%;
    border-radius: 10%;
}

.slideLogoVideo {
    width: 67%;
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
    width: 25%;
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
    background-color: #ebf2fd;
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
