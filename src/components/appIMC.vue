<template>
  <ion-grid>

    <ion-row class=" ion-justify-content-center ion-padding">
      <ion-col size="12" class="ion-padding">

        <ion-text>
          <h1>
            ¿Calificas para una cirugía Plástica?
          </h1>
        </ion-text>

      </ion-col>

      <ion-col size="10" class=" ion-padding">

        <!-- <div class=" ion-padding">
          <ion-icon color="primary" v-if="SexoPeople == 'woman'" :icon="manOutline"></ion-icon>
          <ion-icon color="primary" v-else :icon="womanOutline"></ion-icon>
        </div> -->

        <ion-select interface="popover" v-model="SexoPeople" placeholder="Sexo">
          <ion-select-option value="woman">
            Femenino 👩
          </ion-select-option>
          <ion-select-option value="men">
            Masculino 👨‍🦳
          </ion-select-option>
        </ion-select>

        <ion-select placeholder="Edad">
          <template v-for="n in 90" :key="n">
            <ion-select-option v-if="n > 17 && n < 70" :value="n">
              {{ n }} años
            </ion-select-option>
          </template>
        </ion-select>
      </ion-col>

      <!-- <ion-col size="12" class="ion-padding">
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
      </ion-col> -->
    </ion-row>

    <ion-row class=" ion-justify-content-center ion-padding">

      <ion-col size="10">
        <!-- <ion-text>
          <h3>
            ¿Cual es tu Altura?
          </h3>
        </ion-text> -->

        <ion-select interface="popover" v-model="typeAltura" color="primary" placeholder="CM">
          <ion-select-option value="CM">
            <!-- Centímetros -->
            CM
          </ion-select-option>
          <ion-select-option value="FT+IN">
            <!-- Pies’Pulgadas" -->
            FT+IN
          </ion-select-option>
        </ion-select>

        <template v-if="typeAltura == 'CM'">
          <ion-input class="ion-padding" inputmode="decimal" type="number" v-model="altura.cm" placeholder="ALTURA">
          </ion-input>
        </template>

        <template v-if="typeAltura == 'FT+IN'">
          <ion-row>
            <ion-col size="6">
              <ion-input class="ion-padding" inputmode="decimal" type="number" placeholder="ft'" v-model="altura.ft">
              </ion-input>
            </ion-col>

            <ion-col size="6">
              <ion-input class="ion-padding" inputmode="decimal" type="number" placeholder='in"' v-model="altura.in">
              </ion-input>
            </ion-col>
          </ion-row>

        </template>

      </ion-col>


      <ion-col size="10">
        <!-- <ion-text>
          <h3>
            ¿Cual es tu peso?
          </h3>
        </ion-text> -->

        <ion-select interface="popover" v-model="typePeso" placeholder="KG">
          <ion-select-option value="KG">
            <!-- Centímetros -->
            KG
          </ion-select-option>
          <ion-select-option value="LB">
            <!-- Pies’Pulgadas" -->
            LB
          </ion-select-option>

          <ion-select-option value="ST+LB">
            <!-- Pies’Pulgadas" -->
            ST+LB
          </ion-select-option>

        </ion-select>

        <template v-if="typePeso == 'KG'">
          <ion-input class="ion-padding" inputmode="decimal" type="number" placeholder="PESO" v-model="peso.kg">
          </ion-input>
        </template>

        <template v-if="typePeso == 'LB'">
          <ion-input class="ion-padding" inputmode="decimal" type="number" placeholder="PESO" v-model="peso.lb">
          </ion-input>
        </template>

        <template v-if="typePeso == 'ST+LB'">
          <ion-row>
            <ion-col size="6">
              <ion-input class="ion-padding" inputmode="decimal" type="number" placeholder="st" v-model="peso.st">
              </ion-input>
            </ion-col>

            <ion-col size="6">
              <ion-input class="ion-padding" inputmode="decimal" type="number" placeholder="lb" v-model="peso.lb">
              </ion-input>
            </ion-col>
          </ion-row>

        </template>


      </ion-col>

    </ion-row>

    <ion-row class=" ion-justify-content-center">
      <ion-col size="12">
        <fitness-graphic-vue class="animate__animated animate__bounce" v-if="IMC" :sexo="SexoPeople" :imc="IMC">
        </fitness-graphic-vue>
      </ion-col>

      <ion-col v-show="IMC" size="6">
        <ion-text>
          <h2>
            Tu IMC es:
          </h2>
        </ion-text>
        <ion-text color="primary">
          <h3>
            {{ IMC }}
          </h3>
        </ion-text>

      </ion-col>

    </ion-row>

  </ion-grid>
</template>

<script lang="ts" setup>


// Import
import { womanOutline, manOutline } from "ionicons/icons";
import fitnessGraphicVue from "./fitnessGraphic.vue";
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
  IonText,
  IonItemGroup,
  IonIcon,
  IonSelect,
  IonSelectOption
  // IonCard,
  // IonCardContent,
  // IonCardTitle,
  // IonCardSubtitle,
} from "@ionic/vue";
import { ref, watch, reactive } from "vue";
import 'animate.css'

//Reactive Global Ref

const typePeso = ref('KG')
const typeAltura = ref('CM')


//Objetos Reactivos
interface ipeso {
  kg: any;
  lb: any;
  st: any;
}

// Objeto Peso
const peso: ipeso = reactive({
  kg: null,
  lb: null,
  st: null
});

interface ialtura {
  m: any;
  ft: any;
  in: any;
  cm: any;
}

//Objeto Altura
const altura: ialtura = reactive({
  m: null,
  ft: null,
  in: null,
  cm: null,
});

//Data Props
// const IMCMode = ref("metric"); //us-imperial, metric
// const labelAltura = ref("CM"); //input label Altura
// const labelPeso = ref("KG"); //Input Label Peso
const IMC = ref(); // Indice de Masa corporal
const SexoPeople = ref('woman')

//Functions o methodos
async function calIMC() {
  //Algoridmo de Calcular IMC

  //Var Input Operathor
  let pesoKg: number = peso.kg; //Peso en Kilogramo
  let pesoLb: number = peso.lb; //peso en Libra
  let pesoSt: number = peso.st; //peso en Libra
  let alturaM: number = peso.kg; //Altura en Metro
  let alturaCM: number = altura.cm; //Altura en Centimetro
  let alturaFt: number = altura.ft; //Altura en Pie
  let alturaIn: number = altura.in; //Altura en pulgada

  // let pesoType: string = peso.type; //Tipo de Operacion IMC por Peso
  // let pesoAltura: string = altura.type; // Tipo de Operacion IMC por Altura

  // Libra a Kilogramos, una libra es igual a 0.453592
  if (typePeso.value == "LB") {
    pesoKg = pesoLb * 0.453592;
  }

  //ST+LB Stonia a Kilogramos
  if (typePeso.value == "ST+LB") {
    pesoKg = pesoSt * 6.35029 + pesoLb * 0.453592;
  }


  // Centimetros a Metros, un centimetro es igual a 0.01 metro
  if (typeAltura.value == "CM") {
    alturaM = alturaCM * 0.01;
  }

  //Converte Pie mas pulgada a metro
  if (typeAltura.value == "FT+IN") {
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

watch(typeAltura, () => {
  calIMC();
});

watch(typePeso, () => {
  calIMC();
});


watch(peso, () => {
  calIMC();
});

watch(altura, () => {
  calIMC();
});
</script>

<style scoped>
ion-select {
  font-size: 20px;
  color: rgb(76, 76, 76);
}

ion-input {
  font-size: 21px;
  padding: 10px;
  border: 1px solid #295b8a;
  border-radius: 50px;
}

/* ion-icon {
  font-size: 50px;
} */
</style>
