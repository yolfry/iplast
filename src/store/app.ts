import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage'
// import { useI18n } from 'vue-i18n'


export const useAppStore = defineStore('appStore', {
    state: () => {
        return {
            calculator: {
                colorIMC: '#357FB7',
            },
            emailApp: "info@iplast.com",
            appName: "Iplast"
            // phoneCode: require('@/assets/phoneCode.json'),
            // locale: 'es',
            // locales: ['es', 'en'],
        }
    },
    actions: {
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


