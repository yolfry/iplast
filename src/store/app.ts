import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage'
// import { useI18n } from 'vue-i18n'
import { calIMC } from '@/ts/imc'
import { number } from '@intlify/core-base';

interface ipeso {
    kg: any;
    lb: any;
    st: any;
}

interface ialtura {
    m: any;
    ft: any;
    in: any;
    cm: any;
}

export const useAppStore = defineStore('appStore', {
    state: () => {
        return {
            calculator: {
                colorIMC: '#357FB7',
                peso: <ipeso>{
                    kg: null,
                    lb: null,
                    st: null
                },
                altura: <ialtura>{
                    m: null,
                    ft: null,
                    in: null,
                    cm: null,
                }
                ,
                edadPeople: undefined,
                typePeso: 'KG',
                typeAltura: 'CM',
                IMC: 0,
                SexoPeople: 'woman',
                pesoIdeal: 0,
                pesoRecomendado: 0
            },
            emailApp: "info@iplast.com",
            appName: "Iplast"
        }
    },
    actions: {

        async calcularIMC() {
            //Modulo Calculador
            const resCal = await calIMC(this.calculator.peso, this.calculator.altura, this.calculator.typePeso, this.calculator.typeAltura, this.calculator.IMC, this.calculator.SexoPeople)
            this.calculator.IMC = resCal.IMC;
            this.calculator.peso.kg = resCal.pesoKg;
            this.calculator.altura.m = resCal.alturaM;
            this.calculator.pesoIdeal = resCal.pesoIdeal;
            this.calculator.pesoRecomendado = resCal.pesoRecomendado;
        },
        cleanInputPeso() {
            this.calculator.peso.kg = null
            this.calculator.peso.lb = null
            this.calculator.peso.lb = null
        },
        cleanInputAltura() {
            this.calculator.altura.m = null
            this.calculator.altura.ft = null
            this.calculator.altura.in = null
            this.calculator.altura.cm = null
            this.calculator.IMC = 0
        },
        async saveDataApp(key: string, data: any) {
            try {
                Storage.set({
                    key: key,
                    value: JSON.stringify(data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        async getDataApp(key: string) {
            try {
                const dataApp: any = await Storage.get({
                    key: key
                })
                return JSON.parse(dataApp.value)
            } catch (error) {
                console.log(error)
            }
        },
        async removeDataApp(key: string) {
            try {
                await Storage.remove({
                    key: key
                })
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        // async chargeLanguaje(locale: string) {

        //     if (this.locales.includes(locale)) {
        //         const i18n = await useI18n()
        //         this.locale = locale
        //         i18n.locale.value = this.locale
        //     }

        // }
    }
})


