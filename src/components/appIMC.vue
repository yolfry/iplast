<script lang="ts" setup>


import fitnessGraphicVue from "./fitnessGraphic.vue";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonLabel
} from "@ionic/vue";
import { watch, computed } from "vue";
import { useAppStore } from '@/store/app';


const appStore = useAppStore()



const typeAltura = computed(() => {
  return appStore.calculator.typeAltura
})

const typePeso = computed(() => {
  return appStore.calculator.typePeso
})


watch(appStore.calculator, () => {
  appStore.calcularIMC()
});

watch(typePeso, () => {
  appStore.cleanInputPeso()
  appStore.calcularIMC()
});

watch(typeAltura, () => {
  appStore.cleanInputAltura()
  appStore.calcularIMC()
});

</script>

<template>
  <ion-grid class=" ion-padding card-custom">

    <ion-row class=" ion-padding ion-justify-content-center">

      <ion-col size="12" size-sm="7">

        <ion-row>



          <ion-col size="12" class=" ion-text-center">

            <ion-label>{{ $t('label.height') }}</ion-label>
            <select interface="popover" class=" ion-text-center" v-model="appStore.calculator.typeAltura">
              <option value="CM">
                {{ $t('select.centimeters') }}
              </option>
              <option value="FT+IN">
                {{ $t('select.foot') }}
              </option>
            </select>
          </ion-col>

          <ion-col size="12" class=" ion-justify-content-center">

            <template v-if="appStore.calculator.typeAltura == 'CM'">
              <input inputmode="decimal" type="number" v-model="appStore.calculator.altura.cm"
                :placeholder="$t('placeholder.centimeters')">
            </template>

            <template v-if="appStore.calculator.typeAltura == 'FT+IN'">

              <ion-row>
                <ion-col class=" ion-align-self-auto">
                  <input type="number" :placeholder="$t('placeholder.foot')" v-model="appStore.calculator.altura.ft"
                    class=" ion-text-center" />
                </ion-col>

                <ion-col class=" ion-align-self-auto">
                  <input inputmode="decimal" type="number" :placeholder="$t('placeholder.inches')"
                    v-model="appStore.calculator.altura.in" class=" ion-text-center">
                </ion-col>
              </ion-row>

            </template>
          </ion-col>
        </ion-row>
      </ion-col>


      <ion-col size="12" size-sm="7">

        <ion-row>

          <ion-col size="12" class=" ion-text-center">
            <ion-label>{{ $t('label.weight') }}</ion-label>
            <select interface="popover" v-model="appStore.calculator.typePeso" class=" ion-text-center">
              <option value="KG"> {{ $t('select.kilograms') }}</option>
              <option value="LB"> {{$t('select.pounds') }}</option>
              <option value="ST+LB"> {{$t('select.stonepluspounds') }}</option>
            </select>
          </ion-col>

          <ion-col size="12">

            <template v-if="appStore.calculator.typePeso == 'KG'">
              <input type="number" :placeholder="$t('placeholder.kilograms')" v-model="appStore.calculator.peso.kg"
                class=" ion-text-center" />
            </template>

            <template v-if="appStore.calculator.typePeso == 'LB'">
              <input inputmode="decimal" type="number" :placeholder="$t('placeholder.pounds')"
                v-model="appStore.calculator.peso.lb" class=" ion-text-center">
            </template>

            <template v-if="appStore.calculator.typePeso == 'ST+LB'">
              <ion-row>
                <ion-col class=" ion-align-self-auto">
                  <input inputmode="decimal" type="number" :placeholder="$t('placeholder.stone')"
                    v-model="appStore.calculator.peso.st" class=" ion-text-center" />
                </ion-col>
                <ion-col class=" ion-align-self-auto">
                  <input inputmode="decimal" type="number" :placeholder="$t('placeholder.pounds')"
                    v-model="appStore.calculator.peso.lb" class=" ion-text-center">
                </ion-col>
              </ion-row>
            </template>

          </ion-col>

        </ion-row>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col size="12">
        <fitness-graphic-vue>
        </fitness-graphic-vue>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>




<style scoped>
input {
  width: 100%;
  font-size: 18px;
  padding: 5px;
  border: 0px;
  border-bottom: 1px solid #295b8a;
  padding: 20px;
  border-radius: 1.5rem;
}

ion-label {
  font-size: 20px;
  padding-right: 10px;
  font-weight: bold;
}

.card-custom {
  box-shadow: 1px 2px 3px rgba(189, 189, 189, 0.471);
  background-color: var(--ion-color-tertiary);
  margin: 1rem;
  border-radius: 1.5rem;
}

select {
  font-size: 18px;
  padding: 5px;
  border-bottom: 1px solid #295b8a;
}
</style>
