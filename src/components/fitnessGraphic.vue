<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6">
                <ion-img :src="`/assets/fitness/${props.sexo}${numeroDeIamegen}.svg`" />
            </ion-col>

            <ion-col v-show="props.imc" size="6">
                <ion-text>
                    <h2>
                        Tu IMC es:
                    </h2>
                </ion-text>
                <ion-text>
                    <h3 :style="`color: ${colorIMC};`">
                        {{ props.imc }}
                    </h3>
                </ion-text>

                <ion-card v-if="textEdad">
                    <ion-card-content>
                        <ion-text v-html="textEdad" color="black"></ion-text>
                    </ion-card-content>
                </ion-card>


                <ion-card>
                    <ion-card-content>
                        <ion-text v-html="textIMC" :style="`color: ${colorIMC};`"></ion-text>
                    </ion-card-content>
                </ion-card>

            </ion-col>

        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
import { IonImg, IonRow, IonGrid, IonCol, IonCard, IonCardContent, IonText } from '@ionic/vue';
import { defineProps, ref, onMounted, watch } from 'vue';

const props = defineProps({
    imc: {
        type: Number,
        required: true
    },
    sexo: {
        type: String
    },
    edad: {
        type: Number,
    }
})


//Propiedad Reativas Ref
const numeroDeIamegen = ref()

const colorIMC = ref("#000")
const textIMC = ref()
const textEdad = ref()


//Metodos
function initGraphic() {

    //Obtener informacion por Indice de Masa Colporal
    if (props.imc < 16) {
        numeroDeIamegen.value = 7
        colorIMC.value = '#FF4343'
        textIMC.value = 'Busca hábitos de alimentación para ganar pero, <b>No califica para cirugía plástica</b>, consulta tu médico '
    } else if (props.imc >= 16 && props.imc < 17) {
        numeroDeIamegen.value = 6
        colorIMC.value = '#E06741'
        textIMC.value = '<b>No recomendamos cirugía plástica</b>, es tiempo de ganar un poco de peso, consulta tu médico'
    } else if (props.imc >= 17 && props.imc < 18.5) {
        numeroDeIamegen.value = 6
        colorIMC.value = '#DD8126'
        textIMC.value = '<b>No recomendamos cirugía plástica</b>, es tiempo de ganar un poco de peso, consulta tu médico'
    } else if (props.imc >= 18.5 && props.imc < 25) {
        numeroDeIamegen.value = 5
        colorIMC.value = '#5AAF3E'
        textIMC.value = 'Saludable, <b>puede calificar para cualquier procedimiento quirúrgico de cirugía plástica</b>, Probablemente no tenga suficiente grasa en caso de Liposucción (Lipoescultura)'
    } else if (props.imc >= 25 && props.imc < 30) {
        numeroDeIamegen.value = 4
        colorIMC.value = '#347FB6'
        textIMC.value = 'Sobre peso, <b>Eres el paciente ideal para cualquier procedimiento de cirugía plástica</b>, puede realizar procedimientos combinados con las debidas precauciones médicas.'
    } else if (props.imc >= 30 && props.imc < 35) {
        numeroDeIamegen.value = 3
        colorIMC.value = '#E06741'
        textIMC.value = 'Obesidad Tipo 1, <b>Buen candidato para cirugía plástica de cualquier tipo</b>, incluyendo procedimientos combinados. "Actúa con Cautela"'
    } else if (props.imc >= 35 && props.imc < 40) {
        numeroDeIamegen.value = 2
        colorIMC.value = '#FF4343'
        textIMC.value = 'Obesidad Tipo 2, es tiempo para alimentarse mejor y bajar de peso, <b>puede calificar para procedimientos únicos No combinados.</b>, "Actúa con mucha Cautela por riesgo de complicaciones Alto"'
    } else if (props.imc > 40) {
        numeroDeIamegen.value = 1
        colorIMC.value = '#B71515'
        textIMC.value = 'Obesidad Tipo 3, es tiempo de bajar de peso, <b>No califica para cirugía plástica.</b>'
    }

    //Obtener Informacion Por edad
    if (props.edad) {
        if (props.edad >= 50 && props.edad < 60) {
            textEdad.value = 'Se recomienda un chequeo general antes de ir a cirugía.'
        }

        if (props.edad > 60 && props.edad < 70) {
            textEdad.value = 'Se recomienda un chequeo general, <b>tus opciones quirúrgicas pueden verse limitadas</b>.'
        }
        if (props.edad > 70) {
            textEdad.value = 'Probablemente no califiques para cirugía plástica, <b>¡Disfruta tu vida!</b>.'
        }
    }




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
ion-card {
    margin-left: -20%;
}
</style>