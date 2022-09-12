<template>
  <ion-grid>

    <ion-row class=" ion-padding">

      <ion-col size="12">

        <ion-row>
          <ion-col size="4">
            <ion-text color="primary">
              <h5>{{ $t('label.sex') }}</h5>
            </ion-text>
          </ion-col>

          <ion-col size="8">
            <ion-select interface="popover" v-model="SexoPeople" class=" ion-text-center"
              :placeholder="$t('placeholder.sex')">
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

            <ion-input color="primary" inputmode="numeric" type="number" max="3" min="2" v-model="edadPeople"
              :placeholder="$t('placeholder.years')" class=" ion-text-center">
            </ion-input>

          </ion-col>


        </ion-row>


      </ion-col>

    </ion-row>



    <ion-row class=" ion-padding">

      <ion-col size="12">

        <ion-row>
          <ion-col size="3">
            <ion-text color="primary">
              <h5>{{ $t('label.height') }}</h5>
            </ion-text>
          </ion-col>

          <ion-col size="5">

            <template v-if="typeAltura == 'CM'">
              <ion-input color="primary" inputmode="decimal" type="number" v-model="altura.cm"
                :placeholder="$t('placeholder.centimeters')" class=" ion-text-center">
              </ion-input>
            </template>

            <template v-if="typeAltura == 'FT+IN'">
              <ion-row>
                <ion-col class=" ion-align-self-auto">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.foot')"
                    v-model="altura.ft" class=" ion-text-center">
                  </ion-input>
                </ion-col>

                <ion-col class=" ion-align-self-auto">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.inches')"
                    v-model="altura.in" class=" ion-text-center">
                  </ion-input>
                </ion-col>
              </ion-row>

            </template>


          </ion-col>

          <ion-col size="4">
            <ion-select interface="popover" class=" ion-text-center" v-model="typeAltura" color="primary">
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


      <ion-col size="12">

        <ion-row>
          <ion-col size="3">
            <ion-text color="primary">
              <h5>
                {{ $t('label.weight') }}
              </h5>
            </ion-text>
          </ion-col>

          <ion-col size="5">

            <template v-if="typePeso == 'KG'">
              <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.kilograms')"
                v-model="peso.kg" class=" ion-text-center">
              </ion-input>
            </template>

            <template v-if="typePeso == 'LB'">
              <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.pounds')"
                v-model="peso.lb" class=" ion-text-center">
              </ion-input>
            </template>

            <template v-if="typePeso == 'ST+LB'">
              <ion-row>
                <ion-col size="6">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.stone')"
                    v-model="peso.st" class=" ion-text-center">
                  </ion-input>
                </ion-col>

                <ion-col size="6">
                  <ion-input color="primary" inputmode="decimal" type="number" :placeholder="$t('placeholder.pounds')"
                    v-model="peso.lb" class=" ion-text-center">
                  </ion-input>
                </ion-col>

              </ion-row>

            </template>


          </ion-col>
          <ion-col size="4">
            <ion-select interface="popover" v-model="typePeso" class=" ion-text-center">
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
        <fitness-graphic-vue :peso="peso" :sexo="SexoPeople" :imc="parseFloat(IMC)" :edad="parseInt(edadPeople)"
          :pesoIdeal="pesoIdeal" :pesoRecomendado="pesoRecomendado" :typePeso="typePeso">
        </fitness-graphic-vue>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>

import { calIMC } from '@/ts/imc'
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
import { ref, watch, reactive, onMounted } from "vue";

import { useAccountStore } from '@/store/account';

//Reactive Global Ref
const typePeso = ref('KG')
const typeAltura = ref('CM')
const edadPeople = ref()
const pesoIdeal = ref()
const pesoRecomendado = ref()



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


//Ejecutar Script CalIMC

//Guardar datos Usuario


function dataCal() {
  // const account = useAccountStore();
  const dataCal: any = {}
  dataCal.IMC = IMC.value
  dataCal.pesoKg = peso.kg
  dataCal.alturaM = altura.m
  // account.saveDataUser(dataCal)
}

async function calcularIMC() {
  const resCal = await calIMC(peso, altura, typePeso, typeAltura, IMC, SexoPeople.value)
  IMC.value = resCal.IMC;
  peso.kg = resCal.pesoKg;
  altura.m = resCal.alturaM;
  pesoIdeal.value = resCal.pesoIdeal;
  pesoRecomendado.value = resCal.pesoRecomendado;


  if (IMC.value > 8 && IMC.value < 60) {
    dataCal()
  }
}


//Clean input data 
function cleanInputPeso() {
  peso.kg = null;
  peso.lb = null;
  peso.st = null;
}

function cleanInputAltura() {
  altura.m = null;
  altura.ft = null;
  altura.in = null;
  altura.cm = null;
  IMC.value = null;
}


watch(typeAltura, () => {
  cleanInputAltura()
  calcularIMC()
});

watch(typePeso, () => {
  cleanInputPeso()
  calcularIMC()
});


watch(peso, () => {
  calcularIMC()
});

watch(SexoPeople, () => {
  calcularIMC()
});

watch(altura, () => {
  calcularIMC()
});

watch(edadPeople, () => {
  calcularIMC()
});


onMounted(() => {
  calcularIMC()
});
</script>


<style scoped>
ion-select {
  font-size: 20px;
  color: rgb(255, 255, 255);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 200px;

  background: #347fb6;
  background: linear-gradient(90deg, #347fb6 0%, #2f6095 37%, #204368 100%);
}

ion-select .select-icon-inner {
  left: -15px;
  top: 50%;
  margin-top: -5px;
  position: absolute;
  width: 0px;
  height: 0px;
  border-top: 10px solid;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  color: currentcolor;
  pointer-events: none;
}

.select-icon {
  width: 40px;
  height: 40px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
}


ion-input {
  font-size: 21px;
  padding: 10px;
  border: 0px;
  margin-top: -5px;
  border-bottom: 1px solid #295b8a;
}
</style>
