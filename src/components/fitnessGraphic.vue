<script lang="ts" setup>
import { IonImg, IonRow, IonGrid, IonCol, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonIcon } from '@ionic/vue';
import { ref, onMounted, watch, computed } from 'vue';
import 'animate.css'
import imcGraphic from '@/components/imcGraphic.vue'
import { linkOutline, list, shareSocial, arrowDown } from 'ionicons/icons';
import { useAppStore } from '@/store/app';
import { useI18n } from 'vue-i18n';
import { converte } from '@/ts/imc';


const round = (value: number) => {
    return Math.round(value);
}


// Use i18n
const { t } = useI18n()
const appStore = useAppStore()


const imc = computed(() => {
    return appStore.calculator.IMC
})

const SexoPeople = computed(() => {
    return appStore.calculator.SexoPeople
})

const edadPeople = computed(() => {
    return appStore.calculator.edadPeople
})

const peso = computed(() => {
    return appStore.calculator.peso
})

const pesoIdeal = computed(() => {
    return appStore.calculator.pesoIdeal
})

const pesoRecomendado = computed(() => {
    return appStore.calculator.pesoRecomendado
})

const pesoExcedente = computed(() => {
    return appStore.calculator.pesoExcedente
})


const typePeso = computed(() => {
    return appStore.calculator.typePeso
})



//Propiedad Reativas Ref
const numeroDeIamegen = ref()

const colorIMC = computed(() => {
    return appStore.calculator.colorIMC
})

//Por IMC
const textIMC = ref()
const titleIMC = ref()

//Por edad
const textEdad = ref()
const titleIMCEdad = ref()

//Metodos
function initGraphic() {

    if (imc.value != null) {

        //Obtener informacion por Indice de Masa Colporal
        if (imc.value < 16 && imc.value > 8) {
            numeroDeIamegen.value = 1
            appStore.calculator.colorIMC = '#b71515'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMIunder16')
        } else if (imc.value >= 16 && imc.value < 17) {
            numeroDeIamegen.value = 2
            appStore.calculator.colorIMC = '#ff7c24'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI16to16')
        } else if (imc.value >= 17 && imc.value < 18.5) {
            numeroDeIamegen.value = 3
            appStore.calculator.colorIMC = '#eae01f'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI17to18')
        } else if (imc.value >= 18.5 && imc.value < 25) {
            numeroDeIamegen.value = 4
            appStore.calculator.colorIMC = '#80dd5e'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI18to24')
        } else if (imc.value >= 25 && imc.value < 30) {
            numeroDeIamegen.value = 5
            appStore.calculator.colorIMC = '#319dff'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI25to29')
        } else if (imc.value >= 30 && imc.value < 35) {
            numeroDeIamegen.value = 6
            appStore.calculator.colorIMC = '#eae01f'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI30to34')
        } else if (imc.value >= 35 && imc.value < 40) {
            numeroDeIamegen.value = 7
            appStore.calculator.colorIMC = '#ff7c24'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI35to39')
        } else if (imc.value > 40 && imc.value < 60) {
            numeroDeIamegen.value = 8
            appStore.calculator.colorIMC = '#b71515'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI40to59')
        } else {
            numeroDeIamegen.value = 0
            appStore.calculator.colorIMC = '#357FB7'
            titleIMC.value = null
            textIMC.value = null
        }

        //Obtener Informacion Por edad
        if (edadPeople.value) {
            if (edadPeople.value < 18 && edadPeople.value > 0) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.under18')
            } else if (edadPeople.value >= 50 && edadPeople.value < 60) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.between50and60')
            } else if (edadPeople.value >= 60 && edadPeople.value < 70) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.between60and70')
            } else if (edadPeople.value >= 70 && edadPeople.value < 80) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.between70and80')
            } else if (edadPeople.value >= 80) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.over80')
            } else {
                textEdad.value = null
            }
        } else {
            textEdad.value = null
        }
    }


}

function validateIMC(): boolean {
    if (imc.value > 8 && imc.value < 60) {
        return true
    }
    return false
}



//Observadores
watch(appStore.calculator, () => {
    initGraphic()
})

//Cuando se crea el componente
onMounted(() => {
    initGraphic()
})



</script>

<template>
    <ion-grid class="fitnessGraphic">
        <ion-row class="ion-justify-content-center">
            <ion-col size-sm="7" size="12">
                <ion-card class="background-page"
                    :style="`background: #fff;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        background: linear-gradient(255deg, #fff 75%, ${colorIMC} 100%);`"
                    mode="ios" button>
                    <ion-card-content>
                        <ion-row>
                            <ion-col v-show="validateIMC()" class=" ion-align-self-auto">
                                <ion-img class="animate__animated animate__flash malla_background"
                                    :src="`/assets/fitness/${SexoPeople}${numeroDeIamegen}.svg`"
                                    :style="`border-bottom: 4px solid ${colorIMC}; border-bottom-style:dotted; `" />
                            </ion-col>
                            <ion-col class=" ion-align-self-auto">
                                <ion-row>
                                    <ion-col>
                                        <ion-text class=" ion-text-center">
                                            <h2>{{ $t('text.bmi') }}</h2>
                                        </ion-text>
                                        <ion-text class=" ion-text-center">
                                            <h1 class="h1-plus" :style="`color: ${colorIMC};`">{{ (validateIMC()) ? imc
                                                : `?`
                                            }}</h1>
                                        </ion-text>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text class=" ion-text-center">
                                            <h3>{{ $t('text.weight') }}</h3>
                                        </ion-text>
                                        <ion-text class=" ion-text-center">
                                            <h1>{{ (validateIMC()) ? Math.round(peso.kg) + ` KG` : `?` }}</h1>
                                        </ion-text>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text class=" ion-text-center" color="success">
                                            <h3>{{ $t('text.RecommendedWeight') }}</h3>
                                        </ion-text>
                                        <ion-text class=" ion-text-center" color="success">
                                            <h1>{{
                                                // Converte, convertir valor de peso ideal Kilogramo a peso del usuario
                                                (validateIMC()) ? round(converte(pesoIdeal, typePeso).peso) + `
                                                                                            ${converte(pesoIdeal, typePeso).typePeso} ` : `?`
                                            }}
                                            </h1>
                                        </ion-text>
                                    </ion-col>

                                    <ion-col v-show="imc >= 35 && Math.round(peso.kg - pesoRecomendado) > 0">
                                        <ion-text class=" ion-text-center">
                                            <h3>{{ $t('text.ExcessBMI35') }}</h3>
                                        </ion-text>
                                        <ion-text class=" ion-text-center">
                                            <h1 style="color:#ff7c24;">{{ round(converte(pesoExcedente, typePeso).peso) +
                                                typePeso
                                            }}</h1>
                                        </ion-text>
                                    </ion-col>
                                </ion-row>
                            </ion-col>
                        </ion-row>
                        <!-- <ion-button v-if="validateIMC()" size="small" mode="ios">
                                                                <ion-icon :icon="shareSocial"></ion-icon>
                                                            </ion-button> -->

                    </ion-card-content>

                </ion-card>
            </ion-col>

            <!-- <ion-col class=" ion-text-center">
                    <ion-text color="primary">Mas informacion abajo</ion-text> <ion-icon color="primary"
                        :icon="arrowDown"></ion-icon>
                </ion-col> -->



            <ion-col v-show="textEdad" size-sm="7" size="12">
                <ion-card mode="ios" button>
                    <ion-card-header>
                        <ion-card-title>
                            <ion-text color="primary" class=" ion-text-center">
                                <h1 class=" ion-text-uppercase">
                                    {{ titleIMCEdad }}
                                </h1>
                            </ion-text>
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <p v-html="textEdad"></p>
                    </ion-card-content>
                </ion-card>
            </ion-col>

            <ion-col v-show="validateIMC()" size-sm="7" size="12">
                <ion-card mode="ios" button>
                    <ion-card-header>
                        <ion-card-title>
                            <ion-text class=" ion-text-center">
                                <h1 class=" ion-text-uppercase" :style="`color: ${colorIMC};`">
                                    {{ titleIMC }}
                                </h1>
                            </ion-text>
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>

                        <ion-text class="ion-text-justify">
                            <div v-html="textIMC"></div>
                        </ion-text>

                    </ion-card-content>
                </ion-card>
            </ion-col>

            <ion-col size-sm="7" size="12">
                <ion-card mode="ios" button>
                    <ion-card-content>
                        <ion-text class=" ion-text-center">
                            <h2>{{ $t('text.BMIclassification') }}</h2>
                        </ion-text>
                        <imc-graphic :imc="imc"></imc-graphic>
                    </ion-card-content>
                </ion-card>
            </ion-col>

        </ion-row>

        <ion-row>
            <ion-col>
                <ion-card mode="ios" button>
                    <ion-card-content>
                        <ion-text class=" ion-text-center">
                            <h2>{{ $t('text.references') }}</h2>
                        </ion-text>

                        <ion-item button target="_blank" href="https://academic.oup.com/asj/article/36/6/718/2664472">
                            <ion-icon slot="start" :icon="linkOutline"></ion-icon>
                            <ion-label class="textItem">
                                academic.oup.com
                            </ion-label>
                        </ion-item>

                        <ion-item button target="_blank" href="https://www.cdc.gov/obesity/basics/adult-defining.html">
                            <ion-icon slot="start" :icon="linkOutline"></ion-icon>
                            <ion-label class="textItem">
                                cdc.gov
                            </ion-label>
                        </ion-item>

                        <ion-item button target="_blank" href="https://www.mdpi.com/2077-0383/10/23/5665/htm">
                            <ion-icon slot="start" :icon="linkOutline"></ion-icon>
                            <ion-label class="textItem">
                                mdpi.com
                            </ion-label>
                        </ion-item>

                        <ion-item button target="_blank" @click="$router.push('references')">
                            <ion-icon slot="start" :icon="list"></ion-icon>
                            <ion-label class="textItem">
                                {{ $t('text.plusReferences') }}
                            </ion-label>
                        </ion-item>

                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>


    </ion-grid>
</template>

<style scoped>
ion-card {
    border-radius: 20px;
}

.h1-plus {
    font-size: 30px;
}

.malla_background {
    background-image: url('@/assets/malla_background.svg');
    background-size: cover;
}


.fitnessGraphic .grafitData {
    border-radius: 10px;
    background-color: #fff;
}

.boxImage {
    margin-top: -40%;
    margin-left: -20%;
}

ion-img {
    border-radius: 30px;
}


@keyframes animateBg {
    0% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 10% 0%;
    }
}
</style>