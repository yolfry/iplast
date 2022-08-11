// Lang I18n
import { createI18n } from 'vue-i18n'
import { Device } from '@capacitor/device';

const installI18n = async () => {

    const languejeDevice = await Device.getLanguageCode()
    let langueje: string

    if (/^es/.exec(languejeDevice.value)) {
        // español
        langueje = 'es'
    } else if (/^en/.exec(languejeDevice.value)) {
        // inglés
        langueje = 'en'
    } else if (/^fr/.exec(languejeDevice.value)) {
        // francés
        langueje = 'fr'
    } else {
        // por defecto Inglés
        langueje = 'en'
    }


    const i18n = createI18n({
        locale: langueje,
        fallbackLocale: 'en',
        legacy: false, //Correcion de error Modo heredado
        allowComposition: true,
        messages: {
            en: require('@/locales/en.json'),
            es: require('@/locales/es.json'),
            fr: require('@/locales/fr.json'),
        }
    })

    return await i18n

}


export default installI18n



