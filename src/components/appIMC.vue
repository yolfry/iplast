<script lang="ts" setup>


import fitnessGraphicVue from "./fitnessGraphic.vue";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonInput,
  IonText,
  IonSelect,
  IonSelectOption,
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
  <ion-grid>
    <ion-row class=" ion-padding ion-justify-content-center">
      <ion-col size="12" size-sm="7">
        <ion-row>
          <ion-col size="4">
            <ion-text color="primary">
              <h5>{{ $t('label.sex') }}</h5>
            </ion-text>
          </ion-col>
          <ion-col size="8">
            <ion-select interface="popover" v-model="appStore.calculator.SexoPeople">
              <ion-select-option value="woman">
                {{ $t('select.feminine') }}
              </ion-select-option>
              <ion-select-option value="men">
                {{ $t('select.male') }}
              </ion-select-option>
            </ion-select>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            <ion-text color="primary">
              <h5>{{ $t('label.age') }}</h5>
            </ion-text>
          </ion-col>
          <ion-col size="4">
            <ion-input color="primary" inputmode="numeric" type="number" max="3" min="2"
              v-model="appStore.calculator.edadPeople" :placeholder="$t('placeholder.years')" class=" ion-text-center">
            </ion-input>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>



    <ion-row class=" ion-padding ion-justify-content-center">

      <ion-col size="12" size-sm="7">

        <ion-row>

          <ion-col size="3">
            <ion-text color="primary">
              <h5>{{ $t('label.height') }}</h5>
            </ion-text>
          </ion-col>

          <ion-col size="5">

            <template v-if="appStore.calculator.typeAltura == 'CM'">
              <ion-input color="primary" inputmode="decimal" type="number" v-model="appStore.calculator.altura.cm"
                :placeholder="$t('placeholder.centimeters')" class=" ion-text-center">
              </ion-input>
            </template>

            <template v-if="appStore.calculator.typeAltura == 'FT+IN'">
              <ion-row>
                <ion-col class=" ion-align-self-auto">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.foot')"
                    v-model="appStore.calculator.altura.ft" class=" ion-text-center">
                  </ion-input>
                </ion-col>

                <ion-col class=" ion-align-self-auto">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.inches')"
                    v-model="appStore.calculator.altura.in" class=" ion-text-center">
                  </ion-input>
                </ion-col>
              </ion-row>
            </template>
          </ion-col>

          <ion-col size="4">
            <ion-select interface="popover" class=" ion-text-center" v-model="appStore.calculator.typeAltura"
              color="primary">
              <ion-select-option value="CM">
                <!-- Centímetros -->
                {{ $t('select.centimeters') }}
              </ion-select-option>
              <ion-select-option value="FT+IN">
                <!-- Pies’Pulgadas" -->
                {{ $t('select.foot') }}
              </ion-select-option>
            </ion-select>
          </ion-col>
        </ion-row>
      </ion-col>


      <ion-col size="12" size-sm="7">

        <ion-row>
          <ion-col size="3">
            <ion-text color="primary">
              <h5>
                {{ $t('label.weight') }}
              </h5>
            </ion-text>
          </ion-col>

          <ion-col size="5">

            <template v-if="appStore.calculator.typePeso == 'KG'">
              <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.kilograms')"
                v-model="appStore.calculator.peso.kg" class=" ion-text-center">
              </ion-input>
            </template>

            <template v-if="appStore.calculator.typePeso == 'LB'">
              <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.pounds')"
                v-model="appStore.calculator.peso.lb" class=" ion-text-center">
              </ion-input>
            </template>

            <template v-if="appStore.calculator.typePeso == 'ST+LB'">
              <ion-row>
                <ion-col size="6">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.stone')"
                    v-model="appStore.calculator.peso.st" class=" ion-text-center">
                  </ion-input>
                </ion-col>
                <ion-col size="6">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.pounds')"
                    v-model="appStore.calculator.peso.lb" class=" ion-text-center">
                  </ion-input>
                </ion-col>
              </ion-row>
            </template>

          </ion-col>
          <ion-col size="4">
            <ion-select interface="popover" v-model="appStore.calculator.typePeso" class=" ion-text-center ">
              <ion-select-option value="KG">
                <!-- Centímetros -->
                {{ $t('select.kilograms') }}
              </ion-select-option>
              <ion-select-option value="LB">
                <!-- Pies’Pulgadas" -->
                {{ $t('select.pounds') }}
              </ion-select-option>
              <ion-select-option value="ST+LB">
                <!-- Pies’Pulgadas" -->
                {{ $t('select.stonepluspounds') }}
              </ion-select-option>
            </ion-select>
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
ion-select {
  font-size: 1.4rem;
  color: rgb(255, 255, 255);


  border-radius: 1.5rem;

  padding: 0.3rem;
  background: #347fb6;
  background: linear-gradient(90deg, #347fb6 0%, #2f6095 37%, #204368 100%);

}

ion-select::part(icon) {
  color: #ffffff;
  opacity: 1;
}


ion-select::part(text) {
  text-align: center;
  margin: auto;
  color: rgb(255, 255, 255);
}


ion-input {
  font-size: 21px;
  padding: 10px;
  border: 0px;
  margin-top: -5px;
  border-bottom: 1px solid #295b8a;
}
</style>
