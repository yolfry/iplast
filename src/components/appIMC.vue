<template>
  <ion-grid>
    <ion-card>
      <ion-card-content>
        <ion-row>
          <ion-col size="12" class="ion-padding">
            <ion-card-title color="primary">Calcula tu IMC</ion-card-title>
            <ion-card-subtitle
              >Calculadora del índice de masa corporal (IMC)</ion-card-subtitle
            >
          </ion-col>

          <ion-col size="12" class="ion-padding">
            <ion-radio-group v-model="IMCMode" value="metric">
              <ion-item>
                <ion-label>Centímetros</ion-label>
                <ion-radio slot="start" value="metric"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Pies’Pulgadas"</ion-label>
                <ion-radio slot="start" value="us-imperial"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-col>
          <ion-col size="12" class="ion-padding">
            <!-- Default Input -->
            <ion-item v-if="IMCMode == 'metric'">
              <ion-label position="fixed">ALTURA</ion-label>
              <ion-input
                inputmode="decimal"
                type="number"
                v-model="altura.cm"
                :placeholder="labelAltura"
              ></ion-input>
            </ion-item>

            <ion-item v-else>
              <ion-label position="fixed">ALTURA</ion-label>
              <ion-input
                inputmode="decimal"
                type="number"
                placeholder="ft'"
                v-model="altura.ft"
              ></ion-input>

              <ion-input
                inputmode="decimal"
                type="number"
                placeholder='in"'
                v-model="altura.in"
              ></ion-input>
            </ion-item>

            <ion-item v-if="IMCMode == 'metric'">
              <ion-label position="fixed">PESO</ion-label>
              <ion-input
                inputmode="decimal"
                type="number"
                :placeholder="labelPeso"
                v-model="peso.kg"
              ></ion-input>
            </ion-item>

            <ion-item v-else>
              <ion-label position="fixed">PESO</ion-label>
              <ion-input
                inputmode="decimal"
                type="number"
                :placeholder="labelPeso"
                v-model="peso.lb"
              ></ion-input>
            </ion-item>
          </ion-col>

          <ion-col v-show="IMC" size="12" class="ion-padding">
            <ion-card-title>Tu IMC es:</ion-card-title>
            <ion-card-title color="primary">{{ IMC }}</ion-card-title>
          </ion-col>

          <ion-col size="12" class="ion-padding">
            <ion-button shape="round" @click="cleanValueInput" color="primary"
              >Limpiar</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-card-content>
    </ion-card>
  </ion-grid>
</template>

<script lang="ts" setup>
import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonGrid,
  IonInput,
  IonButton,
  IonRadio,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";

import { ref, watch, reactive } from "vue";

//Objetos Reactivos

interface ipeso {
  type: string; // kg, lb
  kg: any;
  lb: any;
}

// Objeto Peso
const peso: ipeso = reactive({
  type: "kg-kg", // kg, lb
  kg: null,
  lb: null,
});

interface ialtura {
  type: string; // (FT + IN), CM, M
  m: any;
  ft: any;
  in: any;
  cm: any;
}

//Objeto Altura
const altura: ialtura = reactive({
  type: "cm-m", // (FT + IN), CM, M
  m: null,
  ft: null,
  in: null,
  cm: null,
});

//Data Props
const IMCMode = ref("metric"); //us-imperial, metric
const labelAltura = ref("CM"); //input label Altura
const labelPeso = ref("KG"); //Input Label Peso
const IMC = ref(); // Indice de Masa corporal

//Functions o methodos
async function calIMC() {
  //Algoridmo de Calcular IMC

  //Var Input Operathor
  let pesoKg: number = peso.kg; //Peso en Kilogramo
  let pesoLb: number = peso.lb; //peso en Libra
  let alturaM: number = peso.kg; //Altura en Metro
  let alturaCM: number = altura.cm; //Altura en Centimetro
  let alturaFt: number = altura.ft; //Altura en Pie
  let alturaIn: number = altura.in; //Altura en pulgada
  let pesoType: string = peso.type; //Tipo de Operacion IMC por Peso
  let pesoAltura: string = altura.type; // Tipo de Operacion IMC por Altura

  // Libra a Kilogramos, una libra es igual a 0.453592
  if (pesoType == "lb-kg") {
    pesoKg = pesoLb * 0.453592;
  }

  // Centimetros a Metros, un centimetro es igual a 0.01 metro
  if (pesoAltura == "cm-m") {
    alturaM = alturaCM * 0.01;
  }

  //Converte Pie mas pulgada a metro
  if (pesoAltura == "ft+in-m") {
    alturaM = alturaFt * 0.3048 + alturaIn * 0.0254;
  }

  //Formula
  // IMC = peso (kg) / altura 2 (M)
  const formula: number = pesoKg / Math.pow(alturaM, 2);

  if (formula) {
    IMC.value = await formula.toFixed(2); // Obten 2 decimal de un numero flotante
  } else {
    IMC.value = 0;
  }

  // Indice de masa Corporal
  // console.log(IMC.value);
}

function cleanValueInput() {
  altura.m = null;
  altura.ft = null;
  altura.in = null;
  altura.cm = null;

  peso.kg = null;
  peso.lb = null;
}

//Watch
watch(IMCMode, (newVal) => {
  // Si el Modo de medida cambia entonces cambia el modo de calcular el Indice de masa corporal

  // console.log(newVal);
  if (newVal == "metric") {
    labelAltura.value = "CM";
    labelPeso.value = "KG";

    //Declarar el tipo de operacion
    peso.type = "kg-kg";
    altura.type = "cm-m";
  } else if (newVal == "us-imperial") {
    labelAltura.value = `ft'in"`;
    labelPeso.value = "Lbs";

    //Declarar el tipo de operacion
    peso.type = "lb-kg";
    altura.type = "ft+in-m";
  }
});

watch(peso, () => {
  calIMC();
});

watch(altura, () => {
  calIMC();
});
</script>

<style scoped>
.color-sub-title {
  color: var(--ion-color-primary);
}
</style>
