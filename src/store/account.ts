import { defineStore } from "pinia";
import { useAppStore } from "./app";
import axios, { AxiosResponse } from 'axios'

interface user {
    username: string | any;
    password: string | any;
    appConnect: string | any;
    keyUser: string | any;
    name: string | any;
    email: string | any;
    phone: string | any;
    code: string | any;
    numberCode: string;
    newPassword: string | any;
    removeSections: boolean
}



export const useAccountStore = defineStore('accountStore', {
    state: () => {
        return {
            user: <user>{
                username: undefined,
                password: undefined,
                appConnect: undefined,
                keyUser: undefined,
                name: undefined,
                email: undefined,
                phone: undefined,
                code: undefined,
                numberCode: "+1",
                newPassword: undefined,
                removeSections: false
            },
            userAll: undefined as any,
            chargePasswordResult: false,
            $i18n: {},
            appConnect: "Iplast",
            urlApi: "https://account.ypw.com.do/api/v1/"
        }
    },
    actions: {

        async login(): Promise<AxiosResponse | undefined> {
            try {
                //Detectar si el usuario es un numero, y si es un numero colocarle el codigo de pais
                // let username: string | undefined
                // if (this.user.username && /^[(]?\d{3}[)]?\s?-?[.]?\d{3}\s?-?[.]?\d{4}$/.exec(this.user.username)) {
                //     username = this.user.numberCode + this.user.username
                // } else {
                //     username = this.user.username
                // }

                //Login Api
                const data = {
                    username: this.user.username,
                    password: this.user.password,
                    appConnect: this.appConnect
                };

                const config = {
                    method: 'post',
                    url: `${this.urlApi}account/login`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                const response = await axios(config)

                if (response.status === 200 || response.status === 201) {
                    //Agregar Datos de Login
                    this.user.appConnect = data.appConnect
                    this.user.keyUser = response.data.res.keyUser

                    //App Store 
                    const appStore = useAppStore()

                    //Eliminar la contrase-na
                    this.user.password = undefined
                    //Guardar datos del usuario en local
                    await appStore.saveDataApp('user', this.user)
                    await this.getUserData()
                }

                //Login sin Problema True
                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }


        },
        //Guardar Datos en la tabla data
        async saveDataUser(dataSet: any): Promise<AxiosResponse | undefined> {

            //Cargar datos del usuario
            await this.getUserData()

            // console.log(this.userAll.data)
            const dataUser: any = await this.userAll.data
            dataUser.iplast = await { ...dataSet }

            const data = JSON.stringify({
                "appConnect": this.appConnect,
                "keyUser": this.user.keyUser,
                "data": dataUser
            });

            const config = {
                method: 'put',
                url: `${this.urlApi}account/updateFieldData`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            try {
                const response = await axios(config)

                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }

        },
        //Obtener un Codigo de Recuperacion por correo, return true o false
        async setCodeRecovery(): Promise<AxiosResponse | undefined> {


            //Store App 
            const appStore = useAppStore()

            //Libreria Fecha
            const date = await new Date()


            try {

                const data = JSON.stringify({
                    "email": this.user.email,
                    "header": `${appStore.appName} App`,
                    "body": "Your code is: ",
                    "support": `Contact ${appStore.emailApp}`,
                    "footer": `${date.getFullYear} ${appStore.emailApp} App`
                });

                const config = {
                    method: 'post',
                    url: `${this.urlApi}account/setCode/email`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                const response = await axios(config)
                return response


            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }

        },
        //changePassword - Cmabiar contrasena
        async changePassword(): Promise<AxiosResponse | undefined> {

            try {

                const data = JSON.stringify({
                    "email": this.user.email,
                    "codetmp": this.user.code,
                    "newPassword": this.user.password
                });

                const config = {
                    method: 'post',
                    url: `${this.urlApi}account/changePasswCode/email`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };


                const response = await axios(config)

                //Charge Password Ready
                return response


            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }

        },
        async getUserData(): Promise<AxiosResponse | undefined> {

            try {
                const data = JSON.stringify({
                    "keyUser": this.user.keyUser,
                    "appConnect": this.user.appConnect
                });

                const config = {
                    method: 'post',
                    url: `${this.urlApi}account/getUser`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                const response = await axios(config)

                if (response.status === 200 || response.status === 201) {
                    const appStore = useAppStore()
                    this.userAll = response.data.res

                    // Guardar datos en el celular
                    appStore.saveDataApp('userAll', this.userAll)
                }

                //Si el usuario tiene la secion cerrada, limpiar los datos de la cuenta (usuario)
                if (response.status === 401 || response.status === 403) {
                    this.cleanUser()
                }



                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }

        },
        //Limpiar usuario de Store 
        async cleanUser() {

            //Datos del usuario relevante
            this.userAll = undefined
            this.user.keyUser = undefined
            this.user.appConnect = undefined
            this.user.password = undefined
            this.user.code = undefined
            this.user.email = undefined
            this.user.phone = undefined
            this.user.name = undefined
            this.user.username = undefined
            this.user.newPassword = undefined

            //Remover Data
            const appStore = useAppStore()
            appStore.removeDataApp('user')
            appStore.removeDataApp('userAll')
        },
        //Cerrar seccion 
        async logout(): Promise<AxiosResponse | undefined> {


            //Login Api
            const data = {
                appConnect: this.user.appConnect,
                keyUser: this.user.keyUser
            };


            const config = {
                method: 'post',
                url: `${this.urlApi}account/logout`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)

                this.cleanUser()

                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }

        },
        //Eliminar Cuenta  account/deleteAccount
        async deleteAccount(): Promise<AxiosResponse | undefined> {


            //Login Api
            const data = {
                email: this.userAll.email,
                password: this.user.password
            };

            console.log(data)

            const config = {
                method: 'post',
                url: `${this.urlApi}account/deleteAccount`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)

                //Si se elimino la cuenta, entonces limpiamos los datos del usuario
                if (response.status == 200 || response.status == 201) {
                    this.cleanUser()
                }

                this.cleanUser()

                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }

        },
        async register(): Promise<AxiosResponse | undefined> {


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
                url: `${this.urlApi}account/register`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)
                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }


        },
        async activeAccount(): Promise<AxiosResponse | undefined> {


            //Login Api
            const data = {
                codetmp: this.user.code,
                email: this.user.email,
            };

            const config = {
                method: 'post',
                url: `${this.urlApi}account/activateAccount/email`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)

                //Si el usuario se registro correctamente entonces guardarlo en el celular

                if (response.status === 200 || response.status === 201) {
                    //Agregar Datos de Registro
                    this.user.appConnect = response.data.res.appConnect
                    this.user.keyUser = response.data.res.keyUser

                    const { saveDataApp } = useAppStore()

                    await saveDataApp('user', this.user)

                    await this.getUserData()
                }

                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }


        }
        ,
        // Actualizar datos del usuario
        async updateUser(): Promise<AxiosResponse | undefined> {
            //Login Api
            const data = {
                appConnect: this.user.appConnect,
                keyUser: this.user.keyUser,

                name: this.userAll.name,
                dateOfBirth: this.userAll.dateOfBirth,
                country: this.userAll.country,
                phone: this.userAll.phone
            };


            const config = {
                method: 'put',
                url: `${this.urlApi}account/updateDataUser`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            try {
                const response = await axios(config)
                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }
        },
        // Actualizar datos del usuario
        async changePasswordUser(): Promise<AxiosResponse | undefined> {
            //Login Api
            const data = {
                appConnect: this.user.appConnect,
                keyUser: this.user.keyUser,
                newPassword: this.user.newPassword,
                removeSections: this.user.removeSections
            };


            const config = {
                method: 'post',
                url: `${this.urlApi}account/changePassword`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            try {
                const response = await axios(config)
                return response

            } catch (error: any) {
                console.log(error)
                return error.response || error //Axios Error
            }
        }
    }
})