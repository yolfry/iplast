import { defineStore } from 'pinia'


export const userAppStore = defineStore('appStore', {
    state: () => {
        return {
            calculator: {
                colorIMC: '#357FB7',
            }
        }
    }
})


