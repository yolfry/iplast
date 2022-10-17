
<script lang="ts" setup>
import { IonRow, IonGrid, IonCol, IonText } from '@ionic/vue';
import { computed } from 'vue';
import 'animate.css'

import { useAppStore } from '@/store/app';



const appStore = useAppStore()


const imc = computed(() => {
    return appStore.calculator.IMC
})



const colorIMC = computed(() => {
    return appStore.calculator.colorIMC
})

function validateIMC(): boolean {
    if (imc.value > 8 && imc.value < 60) {
        return true
    }
    return false
}

</script>



<template>
    <ion-grid>
        <ion-row class=" ion-justify-content-center">
            <ion-col size="12">
                <ion-text class=" ion-text-center">
                    <h4>{{ $t('text.bmi') }} </h4>
                </ion-text>
                <ion-text class=" ion-text-center">
                    <h1 :style="`color: ${colorIMC};`">{{ (validateIMC()) ? imc
                    : `?`
                    }}</h1>
                </ion-text>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>



