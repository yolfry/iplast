<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6">
                <ion-img :src="`assets/fitness/${props.sexo}${numeroDeIamegen}.svg`" />
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
import { IonImg, IonRow, IonGrid, IonCol } from '@ionic/vue';
import { defineProps, ref, onMounted, watch } from 'vue';

const props = defineProps({
    imc: {
        type: Number,
        required: true
    },
    sexo: {
        type: String
    }
})


//Propiedad Reativas Ref
const numeroDeIamegen = ref()


//Metodos
function obtenerNumeroDeImagen() {

    if (props.imc < 16) {
        numeroDeIamegen.value = 7
    } else if (props.imc >= 16 && props.imc < 17) {
        numeroDeIamegen.value = 6
    } else if (props.imc >= 17 && props.imc < 18.5) {
        numeroDeIamegen.value = 6
    } else if (props.imc >= 18.5 && props.imc < 25) {
        numeroDeIamegen.value = 5
    } else if (props.imc >= 25 && props.imc < 30) {
        numeroDeIamegen.value = 4
    } else if (props.imc >= 30 && props.imc < 35) {
        numeroDeIamegen.value = 3
    } else if (props.imc >= 35 && props.imc < 40) {
        numeroDeIamegen.value = 2
    } else if (props.imc > 40) {
        numeroDeIamegen.value = 1
    }

}

//Observadores

watch(props, (newValue) => {
    obtenerNumeroDeImagen()
})

//Cuando se crea el componente
onMounted(() => {
    obtenerNumeroDeImagen()
})



</script>

<style scoped>
</style>