import { defineStore } from "pinia";

interface user {
    appConnect: string | null,
    keyUser: string | null
}

export const accountStore = defineStore('accountStore', {
    state: () => {
        return {
            user: <user> {
                appConnect: null,
                keyUser: null
            }
        }
    }
})