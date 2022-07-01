<template>
    <ion-grid class="fitnessGraphic">

        <ion-card>
            <ion-card-header>
                <ion-card-title>
                    <ion-text class=" ion-text-center">
                        <h1 :style="`color: ${colorIMC};`">
                            {{ titleIMC }}
                        </h1>
                    </ion-text>
                </ion-card-title>
            </ion-card-header>
            <ion-card-content>

                <p v-if="textEdad" v-html="textEdad"></p>

                <ion-text v-show="validateIMC() && !textEdad" class="ion-text-justify" :style="`color: ${colorIMC};`">
                    <p v-html="textIMC"></p>
                </ion-text>

                <ion-row>
                    <ion-col size="5">
                        <ion-text class=" ion-text-center">
                            <h3 :style="`color: ${colorIMC};`">IMC</h3>
                        </ion-text>
                    </ion-col>
                    <ion-col size="5">
                        <ion-text class=" ion-text-center">
                            <h3>Peso</h3>
                        </ion-text>
                    </ion-col>


                    <ion-col size="5">
                        <ion-text class=" ion-text-center">
                            <h1 :style="`color: ${colorIMC};`">{{ (validateIMC()) ? imc : `?` }}</h1>
                        </ion-text>
                    </ion-col>
                    <ion-col size="5">
                        <ion-text class=" ion-text-center">
                            <h1>{{ (validateIMC()) ? Math.round(peso.kg) + `KG` : `?` }}</h1>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </ion-card-content>
        </ion-card>

        <ion-card>

            <ion-img v-if="validateIMC()" class="animate__animated animate__bounce malla_background"
                :src="`/assets/fitness/${props.sexo}${numeroDeIamegen}.svg`"
                :style="`border-bottom: 4px solid ${colorIMC}; border-bottom-style:dotted; `" />

            <!-- <ion-img v-else class="animate__animated animate__bounce malla_background"
                :src="`/assets/fitness/default${sexo}.svg`" /> -->

            <ion-card-content>
                <ion-text class=" ion-text-center">
                    <h2>Clasificación IMC</h2>
                </ion-text>
                <imc-graphic :imc="imc"></imc-graphic>
            </ion-card-content>
        </ion-card>



        <!-- <ion-row>

            <ion-col size="12">
                <imc-graphic :imc="imc"></imc-graphic>
            </ion-col>

            <ion-col class="boxImage" size="6">
                <ion-img v-if="validateIMC()" class="animate__animated animate__bounce "
                    :src="`/assets/fitness/${props.sexo}${numeroDeIamegen}.svg`"
                    :style="`border-bottom: 4px solid ${colorIMC}; border-bottom-style:dotted; `" />

                <ion-img v-else class="animate__animated animate__bounce" :src="`/assets/fitness/default${sexo}.svg`" />

            </ion-col>



        </ion-row> -->
    </ion-grid>
</template>

<script lang="ts" setup>
import { IonImg, IonRow, IonGrid, IonCol, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineProps, ref, onMounted, watch, computed } from 'vue';
import 'animate.css'
import imcGraphic from '@/components/imcGraphic.vue'

import { userAppStore } from '@/store/app';

const appStore = userAppStore()

const props = defineProps({
    imc: {
        type: Number,
        default: 0
    },
    sexo: {
        type: String
    },
    edad: {
        type: Number,
        default: 0
    },
    peso: {
        type: Object,
        default: () => ({
            kg: 0,
            lb: 0,
            st: 0
        })
    }
})


//Propiedad Reativas Ref
const numeroDeIamegen = ref()

const colorIMC = computed(() => {
    return appStore.calculator.colorIMC
})

const textIMC = ref()
const titleIMC = ref()
const textEdad = ref()


//Metodos
function initGraphic() {

    if (props.imc != null) {

        //Obtener informacion por Indice de Masa Colporal
        if (props.imc < 16 && props.imc > 8) {
            numeroDeIamegen.value = 1
            appStore.calculator.colorIMC = '#FF4343'
            titleIMC.value = 'No califica'
            textIMC.value = 'Busca hábitos de alimentación para ganar pero, <b>No califica para cirugía plástica</b>, consulta tu médico '
        } else if (props.imc >= 16 && props.imc < 17) {
            numeroDeIamegen.value = 2
            appStore.calculator.colorIMC = '#E06741'
            titleIMC.value = 'No recomendamos cirugía plástica'
            textIMC.value = '<b>No recomendamos cirugía plástica</b>, es tiempo de ganar un poco de peso, consulta tu médico'
        } else if (props.imc >= 17 && props.imc < 18.5) {
            numeroDeIamegen.value = 3
            appStore.calculator.colorIMC = '#DD8126'
            titleIMC.value = 'No recomendamos cirugía plástica'
            textIMC.value = '<b>No recomendamos cirugía plástica</b>, es tiempo de ganar un poco de peso, consulta tu médico'
        } else if (props.imc >= 18.5 && props.imc < 25) {
            numeroDeIamegen.value = 4
            appStore.calculator.colorIMC = '#5AAF3E'
            titleIMC.value = 'Califica'
            textIMC.value = 'Saludable, <b>puede calificar para cualquier procedimiento quirúrgico de cirugía plástica</b>, Probablemente no tenga suficiente grasa en caso de Liposucción (Lipoescultura)'
        } else if (props.imc >= 25 && props.imc < 30) {
            numeroDeIamegen.value = 5
            appStore.calculator.colorIMC = '#ffc569'
            titleIMC.value = 'Califica'
            textIMC.value = 'Sobre peso, <b>Eres el paciente ideal para cualquier procedimiento de cirugía plástica</b>, puede realizar procedimientos combinados con las debidas precauciones médicas.'
        } else if (props.imc >= 30 && props.imc < 35) {
            numeroDeIamegen.value = 6
            appStore.calculator.colorIMC = '#E06741'
            titleIMC.value = 'Califica'
            textIMC.value = 'Obesidad Tipo 1, <b>Buen candidato para cirugía plástica de cualquier tipo</b>, incluyendo procedimientos combinados. "Actúa con Cautela"'
        } else if (props.imc >= 35 && props.imc < 40) {
            numeroDeIamegen.value = 7
            appStore.calculator.colorIMC = '#FF4343'
            titleIMC.value = 'Califica'
            textIMC.value = 'Obesidad Tipo 2, es tiempo para alimentarse mejor y bajar de peso, <b>puede calificar para procedimientos únicos No combinados.</b>, "Actúa con mucha Cautela por riesgo de complicaciones Alto"'
        } else if (props.imc > 40 && props.imc < 60) {
            numeroDeIamegen.value = 8
            appStore.calculator.colorIMC = '#B71515'
            titleIMC.value = 'No califica'
            textIMC.value = 'Obesidad Tipo 3, es tiempo de bajar de peso, <b>No califica para cirugía plástica.</b>'
        } else {
            numeroDeIamegen.value = 0
            appStore.calculator.colorIMC = '#357FB7'
            titleIMC.value = null
            textIMC.value = null
        }

        //Obtener Informacion Por edad
        if (props.edad) {

            if (props.edad < 18 && props.edad > 0) {
                appStore.calculator.colorIMC = '#ff4343'
                titleIMC.value = 'Nota'
                textEdad.value = 'Aún no es tiempo para cirugía, <b>Habla con tus padres</b>.'
            } else if (props.edad >= 50 && props.edad < 60) {
                appStore.calculator.colorIMC = '#E06741'
                titleIMC.value = 'Nota'
                textEdad.value = 'Se recomienda un chequeo medico general antes de consultar para ir a cirugía.'
            } else if (props.edad >= 60 && props.edad < 70) {
                appStore.calculator.colorIMC = '#E06741'
                titleIMC.value = 'Nota'
                textEdad.value = 'Tus opciones quirúrgica pueden verse limitadas, <b>Se recomienda un chequeo médico general</b>.'
            } else if (props.edad > 70) {
                appStore.calculator.colorIMC = '#185d84'
                titleIMC.value = 'Nota'
                textEdad.value = 'Probablemente no califiques para cirugía plástica, <b>¡Disfruta tu vida!</b>.'
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

<style>
/* .fitnessGraphic ion-card {
    margin-left: -20%;
} */

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

/*
:style="`border-bottom: 4px solid red; border-bottom-style:dotted; ` + `background: rgb(255,255,255);
                    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 66%, ${colorIMC} 100%);`" */


@keyframes animateBg {
    0% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 10% 0%;
    }
}
</style>