<template>
    <ion-grid class=" ion-padding">
        <ion-col class="ion-justify-content-center">
            <ion-item>
                <ion-avatar slot="start">
                    <img src="/assets/Dr-Manuel-Belen.jpg">
                </ion-avatar>
                <ion-label>DR. MANUEL BELEN
                </ion-label>
            </ion-item>

            <div class=" ion-padding">
                <ion-button shape="round" target="__Tel" href="tel:+1 (829) 545 4401" color="primary">Llamar
                </ion-button>
            </div>
        </ion-col>

        <ion-col>
            <ion-card>
                <img src="/assets/Dr-Manuel-Belen.jpg" />
                <ion-card-content>
                    <ion-text>
                        <p>
                            Egresado "cum laude" de la escuela de medicina de la Universidad Católica
                            <b>Tecnológica del Cibao UCATECI.</b>
                        </p>

                        <p>
                            Egresado con el título de "Cirujano General" de la residencia de cirugía
                        </p>

                        <p>
                            ●General del hospital Dr. Luis E. Aybar.
                        </p>

                        <p>
                            Egresado con el título de "Cirujano Plástico, Reconstructivo y Estético" de la Residencia
                            Nacional de Cirugía Plástica Reconstructiva y Estética (RENACIP) del Hospital Salvador B.
                            Gautier.
                        </p>

                        <a href="https://www.manuelbelen.com/dev/es/about-me/" target="__Web">Leer más</a>
                    </ion-text>
                </ion-card-content>
            </ion-card>
        </ion-col>
    </ion-grid>

    <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button target="__whatsapp" href="https://wa.me/18498815575?text=" color="success">
            <ion-icon :icon="logoWhatsapp"></ion-icon>
        </ion-fab-button>
    </ion-fab>

</template>

<script lang="ts" setup>
import { IonGrid, IonFab, IonFabButton, IonIcon, IonCol, IonItem, IonAvatar, IonLabel, IonText, IonCard, IonCardContent, IonButton } from '@ionic/vue';
import { logoWhatsapp } from 'ionicons/icons';

</script>