<script lang="ts" setup>

import { ref } from 'vue';
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { useAppStore } from '@/store/app';
import { arrowDown, arrowUp } from 'ionicons/icons';
const appStore = useAppStore()


const clicScroll = ref(0)
const scroll = () => {

    const content = document.querySelector('ion-content')
    const scrollData = content?.scrollHeight

    if (clicScroll.value < 3) {
        if (scrollData) {
            content?.scrollByPoint(0, scrollData / 2, 500)
        }
        clicScroll.value++
    } else {
        if (scrollData) {
            content?.scrollToTop(500)
        }
        clicScroll.value = 0
    }

}
</script>

<template>
    <ion-fab @click="scroll()" v-if="appStore.calculator.IMC > 8 && appStore.calculator.IMC < 60" slot="fixed"
        vertical="bottom" horizontal="end">
        <ion-fab-button>
            <ion-icon :icon="clicScroll == 3 ? arrowUp : arrowDown"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>


<style scoped></style>