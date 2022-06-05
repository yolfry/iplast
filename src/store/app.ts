import { defineStore } from 'pinia'


export const userAppStore = defineStore('appStore', {
    state: () => {
        return {
            user: {
                appConnect: null,
                keyUser: null
            }
        }
    }
})


