import { defineStore } from "pinia";

interface user {
    appConnect: string | null,
    keyUser: string | null
}

export const accountStore = defineStore('accountStore', {
    state: () => {
        return {
            user: <user>{
                appConnect: null,
                keyUser: null
            }
        }
    },
    actions: {
        setUser() {
            this.user.appConnect = 'manuelbelenApp'
            this.user.keyUser = 'AlloK439u5uthfgu34h5gu343489484834hfuiwrhfuhdfxxHHHDJHDIE    '
        }
    }
})