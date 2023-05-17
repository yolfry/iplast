import { iAlarme } from "@/interfaces/iAlarme";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import { useI18n } from "vue-i18n";
import alarmeType from "@/enums/alarmeType";
import { LocalNotifications, PermissionStatus, ScheduleOptions } from "@capacitor/local-notifications";
import alarmeCategory from "@/enums/alarmeCategory";
import { alarm } from "ionicons/icons";


export const useAlarmeStore = defineStore(`alarmeStore`, {
    state: () => {
        return {
            alarme: {
                id: 1000
            } as iAlarme,
            alarmes: [] as iAlarme[],
        }
    },
    actions: {
        async permissionNotification() {
            // Check permission and octorge permission 
            try {
                const permission = await LocalNotifications.checkPermissions() as PermissionStatus
                if (permission.display != `granted`) {
                    await LocalNotifications.requestPermissions()
                }
            } catch (error) {
                console.log(error)
            }

        },
        async initializeNotification() {

            try {
                const appStore = useAppStore()
                const { t } = useI18n()

                //get all Alarmas
                const resAlarmes = await appStore.getDataApp(`alarmes`)
                if (!resAlarmes) {
                    await appStore.saveDataApp('alarmes', [])
                } else {
                    this.alarmes = resAlarmes
                }

                //Obtener id default
                const resData = await appStore.getDataApp(`idNotificationCont`)
                if (!resData) {
                    await appStore.saveDataApp('idNotificationCont', this.alarme.id)
                } else {
                    this.alarme.id = parseInt(resData)
                }

                //Name default
                this.alarme.name = `${t('text.alarme')} ${this.alarme.id + 1}`

                //Type default
                this.alarme.type = alarmeType.specific

                // repeat default 
                this.alarme.repeat = false

                //Add defautl recordatory
                this.alarme.alarmeCategory = alarmeCategory.medicine

            } catch (error) {
                console.log(error)
            }
        },
        async setAlarme() {
            try {
                const appStore = useAppStore()
                switch (this.alarme.type) {

                    //Alarme specific
                    case alarmeType.specific:

                        if (this.alarme.at) {

                            await this.permissionNotification()
                            const AT = new Date(this.alarme.at)

                            //Alterar id y sumarle 1
                            this.alarme.id = this.alarme.id + 1

                            const notifications: ScheduleOptions = {
                                notifications: [{
                                    id: this.alarme.id,
                                    autoCancel: true,
                                    title: `Iplast Alarm ${this.alarme.alarmeCategory}`,
                                    body: this.alarme.body ? this.alarme.body : '',
                                    smallIcon: 'icon_' + this.alarme.alarmeCategory,
                                    largeIcon: 'icon_' + this.alarme.alarmeCategory,
                                    schedule: {
                                        at: AT,
                                        repeats: this.alarme.repeat
                                    }
                                }]
                            }

                            await LocalNotifications.schedule(notifications)

                            this.alarmes.push(this.alarme)
                            appStore.saveDataApp(`alarmes`, this.alarmes)
                            appStore.saveDataApp(`idNotificationCont`, this.alarme.id)

                        }

                        break;

                }

            } catch (error) {
                console.log(error)
            }

        },
        async delete(idAlarme: number) {
            const appStore = useAppStore()

            try {

                //Cancelar Notification
                await LocalNotifications.cancel({
                    notifications: [
                        {
                            id: idAlarme
                        }
                    ]
                })


                this.alarmes = await this.alarmes.filter(alarme => {
                    return alarme.id != idAlarme
                })

                appStore.saveDataApp(`alarmes`, this.alarmes)
            } catch (error) {
                console.log(error)
            }

        },
        async repeatAlarme(alarme: iAlarme) {

            const appStore = useAppStore()

            //Si la notification se encuentra en repeticion, es que el usuario quiere cancelarla, de lo contrario es que el usuario quiere activarla
            if (alarme.repeat) {

                //Cancelar Notification
                //Cancelar si ya hay una alarma en curso
                await this.delete(alarme.id)

                alarme.repeat = false

                await this.alarmes.push(alarme)


                //Actualizar local notification
                appStore.saveDataApp(`alarmes`, this.alarmes)


            } else {
                //Cancelar si ya hay una alarma en curso
                await this.delete(alarme.id)

                //Agregar datos al formulario alarma
                this.alarme = alarme

                //Activar repeact
                this.alarme.repeat = true

                //Agregar Alarma
                await this.setAlarme()


                //Editar Notification
                await this.alarmes.map(al => {
                    if (al.id == alarme.id) {
                        al.repeat = true
                    }
                })

                //Actualizar local notificatioins
                appStore.saveDataApp(`alarmes`, this.alarmes)


            }

        }
    }
}) 