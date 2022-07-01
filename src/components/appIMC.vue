<template>
  <ion-grid>

    <ion-row class=" ion-padding">

      <ion-col size="12">

        <ion-row>
          <ion-col size="4">
            <ion-text color="primary">
              <h3>SEXO</h3>
            </ion-text>
          </ion-col>

          <ion-col size="8">
            <ion-select interface="popover" v-model="SexoPeople" placeholder="Sexo">
              <ion-select-option value="woman">
                Femenino
              </ion-select-option>
              <ion-select-option value="men">
                Masculino
              </ion-select-option>
            </ion-select>

          </ion-col>
        </ion-row>

        <ion-row>

          <ion-col size="4">
            <ion-text color="primary">
              <h4>EDAD</h4>
            </ion-text>
          </ion-col>

          <ion-col size="3">

            <ion-input color="primary" inputmode="numeric" type="number" max="3" min="2" v-model="edadPeople"
              placeholder="Edad">
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
              <h5>ALTURA</h5>
            </ion-text>
          </ion-col>

          <ion-col size="5">

            <template v-if="typeAltura == 'CM'">
              <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" v-model="altura.cm"
                placeholder="cm">
              </ion-input>
            </template>

            <template v-if="typeAltura == 'FT+IN'">
              <ion-row>
                <ion-col size="6">
                  <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" placeholder="ft'"
                    v-model="altura.ft">
                  </ion-input>
                </ion-col>

                <ion-col size="6">
                  <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" placeholder='in"'
                    v-model="altura.in">
                  </ion-input>
                </ion-col>
              </ion-row>

            </template>


          </ion-col>

          <ion-col size="4">
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
          </ion-col>
        </ion-row>

      </ion-col>


      <ion-col size="12">

        <ion-row>
          <ion-col size="3">
            <ion-text color="primary">
              <h4>
                PESO
              </h4>
            </ion-text>
          </ion-col>

          <ion-col size="5">

            <template v-if="typePeso == 'KG'">
              <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" placeholder="kg"
                v-model="peso.kg">
              </ion-input>
            </template>

            <template v-if="typePeso == 'LB'">
              <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" placeholder="lb"
                v-model="peso.lb">
              </ion-input>
            </template>

            <template v-if="typePeso == 'ST+LB'">
              <ion-row>
                <ion-col size="6">
                  <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" placeholder="st"
                    v-model="peso.st">
                  </ion-input>
                </ion-col>

                <ion-col size="6">
                  <ion-input color="primary" class="ion-padding" inputmode="decimal" type="number" placeholder="lb"
                    v-model="peso.lb">
                  </ion-input>
                </ion-col>
              </ion-row>

            </template>


          </ion-col>
          <ion-col size="4">
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
          </ion-col>
        </ion-row>



      </ion-col>

    </ion-row>


    <ion-row>
      <ion-col size="12">
        <fitness-graphic-vue :peso="peso" :sexo="SexoPeople" :imc="IMC" :edad="edadPeople">
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
  IonSelectOption,
  // IonCard,
  // IonCardContent,
  // IonCardTitle,
  // IonCardSubtitle,
} from "@ionic/vue";
import { ref, watch, reactive, onMounted } from "vue";

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


//Ejecutar Script CalIMC

async function calcularIMC() {
  const resCal = await calIMC(peso, altura, typePeso, typeAltura, IMC)
  IMC.value = resCal.IMC;
  peso.kg = resCal.pesoKg;
  altura.m = resCal.alturaM;
}


watch(typeAltura, () => {
  calcularIMC()
});

watch(typePeso, () => {
  calcularIMC()
});


watch(peso, () => {
  calcularIMC()
});

watch(altura, () => {
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

ion-input {
  font-size: 21px;
  padding: 10px;

  border: 0px;
  border-bottom: 1px solid #295b8a;
  /* border: 0px 0px 0px 1px solid #295b8a; */
  /*border-radius: 50px;*/
}

/* ion-icon {
  font-size: 50px;
} */
</style>
