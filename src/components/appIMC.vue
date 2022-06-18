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


        <ion-select interface="popover" v-model="SexoPeople" placeholder="Sexo">
          <ion-select-option value="woman">
            Femenino 👩
          </ion-select-option>
          <ion-select-option value="men">
            Masculino 👨
          </ion-select-option>
        </ion-select>

        <ion-select v-model="edadPeople" placeholder="Edad">
          <template v-for="n in 90" :key="n">
            <ion-select-option v-if="n > 17 && n < 70" :value="n">
              {{ n }} años
            </ion-select-option>
          </template>
        </ion-select>
      </ion-col>

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
        <fitness-graphic-vue class="animate__animated animate__bounce" v-if="IMC" :sexo="SexoPeople" :imc="IMC"
          :edad="edadPeople">
        </fitness-graphic-vue>
      </ion-col>
    </ion-row>

  </ion-grid>
</template>

<script lang="ts" setup>


// Import
// import { womanOutline, manOutline } from "ionicons/icons";
import { calIMC } from '@/ts/imc'
import fitnessGraphicVue from "./fitnessGraphic.vue";
import {
  IonRow,
  IonCol,
  // IonItem,
  // IonLabel,
  // IonRadioGroup,
  IonGrid,
  IonInput,
  // IonButton,
  // IonRadio,
  IonText,
  // IonItemGroup,
  // IonIcon,
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
const edadPeople = ref()


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

calIMC(peso, altura, typePeso, typeAltura, IMC)



watch(typeAltura, () => {
  calIMC(peso, altura, typePeso, typeAltura, IMC);
});

watch(typePeso, () => {
  calIMC(peso, altura, typePeso, typeAltura, IMC);
});


watch(peso, () => {
  calIMC(peso, altura, typePeso, typeAltura, IMC);
});

watch(altura, () => {
  calIMC(peso, altura, typePeso, typeAltura, IMC);
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
