import { defineStore } from "pinia";
import axios from 'axios'
import { loadingController, toastController } from '@ionic/vue'



interface user {
    username: string | undefined;
    password: string | undefined;
    appConnect: string | undefined;
    keyUser: string | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}


export const accountStore = defineStore('accountStore', {
    state: () => {
        return {
            user: <user>{
                username: undefined,
                password: undefined,
                appConnect: undefined,
                keyUser: undefined,
                name: undefined,
                email: undefined,
                phone: undefined
            }
        }
    },
    actions: {
        setUser() {
            this.user.appConnect = 'iplast'
            this.user.keyUser = 'AlloK439u5uthfgu34h5gu343489484834hfuiwrhfuhdfxxHHHDJHDIE    '
        },
        async login() {


            //Loading Login
            const loading = await loadingController
                .create({
                    cssClass: 'my-custom-class',
                    message: 'Cargando...',
                });

            await loading.present();


            //Login Api
            const data = {
                username: this.user.username,
                password: this.user.password,
                appConnect: 'Iplast'
            };

            const config = {
                method: 'post',
                url: 'https://account.ypw.com.do/api/v1/account/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)

                if (response.status == 200 || response.status == 201) {

                    loading.dismiss()
                    console.log(response.data)

                    if (response.data.error) {

                        //Toast Notification Response error
                        const toast = await toastController
                            .create({
                                message: response.data.message,
                                duration: 2000
                            })

                        toast.present();

                        throw new Error(response.data.message)
                    }

                    //Agregar Datos de Login
                    this.user.appConnect = data.appConnect
                    this.user.keyUser = response.data.res.keyUser



                } else {
                    throw new Error(response.statusText)
                }

            } catch (error) {
                console.log(error)
                loading.dismiss()
            }


        },
        async register() {


            //Loading Login
            const loading = await loadingController
                .create({
                    cssClass: 'my-custom-class',
                    message: 'Cargando...',
                });

            await loading.present();


            //Login Api
            const data = {
                username: this.user.username,
                password: this.user.password,
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone
            };

            const config = {
                method: 'post',
                url: 'https://account.ypw.com.do/api/v1/account/register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)

                if (response.status == 200 || response.status == 201) {

                    loading.dismiss()
                    console.log(response.data)

                    if (response.data.error) {

                        //Toast Notification Response error
                        const toast = await toastController
                            .create({
                                message: response.data.message,
                                duration: 2000
                            })

                        toast.present();

                        throw new Error(response.data.message)
                    }

                    //Agregar Datos de Registro
                    this.user.appConnect = response.data.res.appConnect
                    this.user.keyUser = response.data.res.keyUser


                } else {
                    throw new Error(response.statusText)
                }

            } catch (error) {
                console.log(error)
                loading.dismiss()
            }


        }
    }
})