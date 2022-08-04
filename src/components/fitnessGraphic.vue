<template>
    <ion-grid class="fitnessGraphic">

        <ion-row class="ion-justify-content-center">

            <ion-col class=" ion-align-self-auto">

                <ion-card>
                    <ion-card-content>

                        <ion-row>
                            <ion-col v-show="validateIMC()" class=" ion-align-self-auto">
                                <ion-img class="animate__animated animate__flash malla_background"
                                    :src="`/assets/fitness/${props.sexo}${numeroDeIamegen}.svg`"
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
                                        <ion-text class=" ion-text-center">
                                            <h3>{{ $t('text.RecommendedWeight') }}</h3>
                                        </ion-text>
                                        <ion-text class=" ion-text-center">
                                            <h1>{{ (validateIMC()) ? Math.round(pesoIdeal) + ` KG` : `?` }}</h1>
                                        </ion-text>
                                    </ion-col>

                                    <ion-col v-show="imc > 35 && Math.round(peso.kg - pesoRecomendado) > 0">
                                        <ion-text class=" ion-text-center">
                                            <h3>{{ $t('text.ExcessBMI35') }}</h3>
                                        </ion-text>
                                        <ion-text class=" ion-text-center">
                                            <h1 style="color:#ff7c24;">{{ (validateIMC()) ? Math.round(peso.kg -
                                                    pesoRecomendado) +
                                                    `KG` : `?`
                                            }}</h1>
                                        </ion-text>
                                    </ion-col>
                                </ion-row>

                            </ion-col>
                        </ion-row>



                    </ion-card-content>
                </ion-card>
            </ion-col>



            <ion-col size="12">
                <ion-card v-show="textEdad">
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

            <ion-col size="12">
                <ion-card v-show="validateIMC()">
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

            <ion-col size="12">
                <ion-card>
                    <ion-card-content>
                        <ion-text class=" ion-text-center">
                            <h2>{{ $t('text.BMIclassification') }}</h2>
                        </ion-text>
                        <imc-graphic :imc="imc"></imc-graphic>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>



    </ion-grid>
</template>

<script lang="ts" setup>
import { IonImg, IonRow, IonGrid, IonCol, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineProps, ref, onMounted, watch, computed } from 'vue';
import 'animate.css'
import imcGraphic from '@/components/imcGraphic.vue'

import { useAppStore } from '@/store/app';
import { useI18n } from 'vue-i18n';


// Use i18n
const { t } = useI18n()


const appStore = useAppStore()



const props = defineProps(
    {
        imc: {
            type: Number,
            default: 0
        },
        sexo: {
            type: String
        },
        edad: {
            type: Number,
            default: 0,
        },
        peso: {
            type: Object,
            default: () => ({
                kg: 0,
                lb: 0,
                st: 0
            })
        },
        pesoIdeal: {
            type: Number,
            default: 0
        },
        pesoRecomendado: {
            type: Number,
            default: 0
        },
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


    if (props.imc != null) {

        //Obtener informacion por Indice de Masa Colporal
        if (props.imc < 16 && props.imc > 8) {
            numeroDeIamegen.value = 1
            appStore.calculator.colorIMC = '#b71515'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMIunder16')
        } else if (props.imc >= 16 && props.imc < 17) {
            numeroDeIamegen.value = 2
            appStore.calculator.colorIMC = '#ff7c24'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI16to16')
        } else if (props.imc >= 17 && props.imc < 18.5) {
            numeroDeIamegen.value = 3
            appStore.calculator.colorIMC = '#eae01f'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI17to18')
        } else if (props.imc >= 18.5 && props.imc < 25) {
            numeroDeIamegen.value = 4
            appStore.calculator.colorIMC = '#80dd5e'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI18to24')
        } else if (props.imc >= 25 && props.imc < 30) {
            numeroDeIamegen.value = 5
            appStore.calculator.colorIMC = '#319dff'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI25to29')
        } else if (props.imc >= 30 && props.imc < 35) {
            numeroDeIamegen.value = 6
            appStore.calculator.colorIMC = '#eae01f'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI30to34')
        } else if (props.imc >= 35 && props.imc < 40) {
            numeroDeIamegen.value = 7
            appStore.calculator.colorIMC = '#ff7c24'
            titleIMC.value = t('text.forYourBMI')
            textIMC.value = t('text.BMI35to39')
        } else if (props.imc > 40 && props.imc < 60) {
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
        if (props.edad) {
            if (props.edad < 18 && props.edad > 0) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.under18')
            } else if (props.edad >= 50 && props.edad < 60) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.between50and60')
            } else if (props.edad >= 60 && props.edad < 70) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.between60and70')
            } else if (props.edad >= 70 && props.edad < 80) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.between70and80')
            } else if (props.edad >= 80) {
                titleIMCEdad.value = t('text.forYourAge')
                textEdad.value = t('text.over80')
            } else {
                textEdad.value = null
            }
        }
    }


}

function validateIMC(): boolean {
    if (props.imc > 8 && props.imc < 60) {
        return true
    }
    return false
}



//Observadores

watch(props, () => {
    initGraphic()
})

//Cuando se crea el componente
onMounted(() => {
    initGraphic()
})



</script>

<style scoped>
/* .fitnessGraphic ion-card {
    margin-left: -20%;
} */
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