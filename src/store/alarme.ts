import { iAlarme } from "@/interfaces/iAlarme";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import { LocalNotifications, PermissionStatus } from "@capacitor/local-notifications";
//capacitor-alarm-notification
import { clockAlarm } from 'capacitor-clock-alarm'
import { parseISOString } from '@/ts/parseISOString'
import alarmeCategory from "@/enums/alarmeCategory";



export const useAlarmeStore = defineStore(`alarmeStore`, {
    state: () => {
        return {
            alarmes: [] as iAlarme[]
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
        async getId(): Promise<number> {
            try {
                const appStore = useAppStore()
                const resData = await appStore.getDataApp(`idNotificationCont`)
                if (!resData) {
                    await appStore.saveDataApp('idNotificationCont', 1000)
                    return 1000
                } else {
                    await appStore.saveDataApp('idNotificationCont', parseInt(resData) + 7)
                    return parseInt(resData) + 7
                }
            } catch (error) {
                return 1000
            }
        },
        async getAlarmes(): Promise<void> {
            try {
                const appStore = useAppStore()


                const alarmes: iAlarme[] = await appStore.getDataApp(`alarmes`)


                if (!alarmes) {
                    await appStore.saveDataApp('alarmes', [])
                }

                if (alarmes) {
                    this.alarmes = alarmes.reverse()
                }

            } catch (error) {
                console.log(error)
            }
        },
        async saveAlarmes() {
            try {
                await useAppStore().saveDataApp('alarmes', this.alarmes)

                return true
            } catch (error) {
                return false
            }
        },
        async setLocalNotification(alarme: iAlarme) {
            try {
                await this.permissionNotification()


                //Type alarm Cita
                if (alarme.alarmeCategory == alarmeCategory.cita) {

                    //Fecha y Hora
                    const at = new Date(alarme.at)

                    //Recordar un dia antes
                    if (alarme.options?.cita?.rememberBefore) {

                        const dateDayBefore = new Date(alarme.at)
                        dateDayBefore.setDate(dateDayBefore.getDate() - 1);

                        //Clock Alarme date before
                        await clockAlarm.setAlarm({
                            id: alarme.id + 1,
                            message: `Recuerda la Siguiente Cita ` + at.toLocaleString(),
                            repeats: false,
                            at: parseISOString(dateDayBefore)
                        })

                        //Notification
                        await LocalNotifications.schedule({
                            notifications: [
                                {
                                    id: alarme.id + 1,
                                    autoCancel: true,
                                    title: `Recuerda la Siguiente Cita ` + at.toLocaleString(),
                                    body: alarme.body,
                                    summaryText: alarme.body,
                                    smallIcon: 'icon_' + alarme.alarmeCategory,
                                    largeIcon: 'icon_' + alarme.alarmeCategory,
                                    iconColor: alarme.color,
                                    schedule: {
                                        allowWhileIdle: true,
                                        at: dateDayBefore
                                    }
                                }]
                        })

                    }

                    //Recordar 30 minutos antes
                    const date30MinuteBefore = new Date(alarme.at)
                    date30MinuteBefore.setMinutes(date30MinuteBefore.getMinutes() - 30);

                    //Clock Alarme date before
                    await clockAlarm.setAlarm({
                        id: alarme.id + 2,
                        message: `Tu cita empieza en 30 minutos ` + at.toLocaleString(),
                        repeats: false,
                        at: parseISOString(date30MinuteBefore)
                    })

                    //Notification
                    await LocalNotifications.schedule({
                        notifications: [
                            {
                                id: alarme.id + 2,
                                autoCancel: true,
                                title: `Tu cita empieza en 30 minutos ` + at.toLocaleString(),
                                body: alarme.body,
                                summaryText: alarme.body,
                                smallIcon: 'icon_' + alarme.alarmeCategory,
                                largeIcon: 'icon_' + alarme.alarmeCategory,
                                iconColor: alarme.color,
                                schedule: {
                                    allowWhileIdle: true,
                                    at: date30MinuteBefore
                                }
                            }]
                    })


                    //Recordar el dia de la cita
                    //Clock Alarme
                    await clockAlarm.setAlarm({
                        id: alarme.id,
                        message: 'Hola, tu cita a comenzado! ' + alarme.body,
                        repeats: false,
                        at: parseISOString(at)
                    })

                    //Notificacion
                    await LocalNotifications.schedule({
                        notifications: [
                            {
                                id: alarme.id,
                                autoCancel: true,
                                title: `Hola, tu cita a comenzado!`,
                                body: alarme.body,
                                summaryText: alarme.body,
                                smallIcon: 'icon_' + alarme.alarmeCategory,
                                largeIcon: 'icon_' + alarme.alarmeCategory,
                                iconColor: alarme.color,
                                schedule: {
                                    allowWhileIdle: true,
                                    at: at
                                }
                            }]
                    })

                }
                //Fin del modo cita


                //Recordatorio o Alarma Basica ✅
                if (alarme.alarmeCategory == alarmeCategory.reminder) {


                    const at = new Date(alarme.at)

                    //Recordatorio por fecha
                    if (!alarme.weekday?.length && !alarme.options?.reminder?.notify) {

                        //Clock Alarme
                        await clockAlarm.setAlarm({
                            id: alarme.id,
                            message: 'Recordatorio, ' + alarme.body,
                            repeats: false,
                            at: parseISOString(at)
                        })

                        //Notificacion
                        await LocalNotifications.schedule({
                            notifications: [
                                {
                                    id: alarme.id,
                                    autoCancel: true,
                                    title: `Recordatorio`,
                                    body: alarme.body,
                                    summaryText: alarme.body,
                                    smallIcon: 'icon_' + alarme.alarmeCategory,
                                    largeIcon: 'icon_' + alarme.alarmeCategory,
                                    iconColor: alarme.color,
                                    schedule: {
                                        allowWhileIdle: true,
                                        at: at
                                    }
                                }]
                        })
                    }


                    //Recordatorio, cada dia de la Semana ✅
                    if (alarme.weekday?.length) {
                        //Reccorrer dia de la semana
                        alarme.weekday.forEach(async (wee, index) => {

                            await clockAlarm.setAlarm({
                                id: alarme.id + index,
                                message: alarme.alarmeCategory + " " + alarme.body,
                                repeats: true,
                                Weekday: wee,
                                hour: at.getHours(),
                                minute: at.getMinutes()
                            })

                            //Notificacion
                            await LocalNotifications.schedule({
                                notifications: [
                                    {
                                        id: alarme.id + index,
                                        autoCancel: true,
                                        title: alarme.alarmeCategory,
                                        body: alarme.body,
                                        summaryText: alarme.body,
                                        smallIcon: 'icon_' + alarme.alarmeCategory,
                                        largeIcon: 'icon_' + alarme.alarmeCategory,
                                        iconColor: alarme.color,
                                        schedule: {
                                            allowWhileIdle: true,
                                            on: {
                                                hour: at.getHours(),
                                                minute: at.getMinutes(),
                                                weekday: wee
                                            }
                                        }
                                    }]
                            })

                        });

                    }

                    //Recordar por notificaciones
                    if (alarme.options?.reminder?.notify) {

                        switch (alarme.options.reminder.notify) {

                            case 'weekly':

                                //"annual" | "monthly" | "weekly"
                                await LocalNotifications.schedule({
                                    notifications: [
                                        {
                                            id: alarme.id,
                                            autoCancel: true,
                                            title: alarme.alarmeCategory,
                                            body: alarme.body,
                                            summaryText: alarme.body,
                                            smallIcon: 'icon_' + alarme.alarmeCategory,
                                            largeIcon: 'icon_' + alarme.alarmeCategory,
                                            iconColor: alarme.color,
                                            schedule: {
                                                allowWhileIdle: true,
                                                on: {
                                                    hour: at.getHours(),
                                                    minute: at.getMinutes()
                                                }
                                            }
                                        }]
                                })
                                break;

                            case "monthly":
                                await LocalNotifications.schedule({
                                    notifications: [
                                        {
                                            id: alarme.id,
                                            autoCancel: true,
                                            title: alarme.alarmeCategory,
                                            body: alarme.body,
                                            summaryText: alarme.body,
                                            smallIcon: 'icon_' + alarme.alarmeCategory,
                                            largeIcon: 'icon_' + alarme.alarmeCategory,
                                            iconColor: alarme.color,
                                            schedule: {
                                                allowWhileIdle: true,
                                                on: {
                                                    day: at.getDate(),
                                                    hour: at.getHours(),
                                                    minute: at.getMinutes()
                                                }
                                            }
                                        }]
                                })
                                break;

                            case "annual":

                                await LocalNotifications.schedule({
                                    notifications: [
                                        {
                                            id: alarme.id,
                                            autoCancel: true,
                                            title: alarme.alarmeCategory,
                                            body: alarme.body,
                                            summaryText: alarme.body,
                                            smallIcon: 'icon_' + alarme.alarmeCategory,
                                            largeIcon: 'icon_' + alarme.alarmeCategory,
                                            iconColor: alarme.color,
                                            schedule: {
                                                allowWhileIdle: true,
                                                on: {
                                                    month: at.getMonth() + 1,
                                                    day: at.getDate(),
                                                    hour: at.getHours(),
                                                    minute: at.getMinutes()
                                                }
                                            }
                                        }]
                                })
                                break;
                        }

                    }

                }


                //Type alarm Medicine 
                if (alarme.alarmeCategory == alarmeCategory.medicine) {

                    const at = new Date(alarme.at)

                    if (!alarme.repeat) {

                        //Clock Alarme date before
                        await clockAlarm.setAlarm({
                            id: alarme.id,
                            message: alarme.body,
                            repeats: false,
                            at: parseISOString(at)
                        })

                        //Notification
                        await LocalNotifications.schedule({
                            notifications: [
                                {
                                    id: alarme.id,
                                    autoCancel: true,
                                    title: alarme.alarmeCategory,
                                    body: alarme.body,
                                    summaryText: alarme.body,
                                    smallIcon: 'icon_' + alarme.alarmeCategory,
                                    largeIcon: 'icon_' + alarme.alarmeCategory,
                                    iconColor: alarme.color,
                                    schedule: {
                                        allowWhileIdle: true,
                                        at: at
                                    }
                                }]
                        })

                    } else {

                        let cont: number | undefined = 0

                        if (alarme.every == 'hour') {
                            if (alarme.count) {
                                cont = (alarme.count < 6) ? 6 : alarme.count
                            } else {
                                cont = 6
                            }
                        } else {
                            cont = alarme.count
                        }

                        //Clock Alarme date before
                        await clockAlarm.setAlarm({
                            id: alarme.id,
                            message: alarme.body,
                            repeats: true,
                            every: alarme.every,
                            count: cont
                        })

                        //Notification
                        await LocalNotifications.schedule({
                            notifications: [
                                {
                                    id: alarme.id,
                                    autoCancel: true,
                                    title: alarme.alarmeCategory,
                                    body: alarme.body,
                                    summaryText: alarme.body,
                                    smallIcon: 'icon_' + alarme.alarmeCategory,
                                    largeIcon: 'icon_' + alarme.alarmeCategory,
                                    iconColor: alarme.color,
                                    schedule: {
                                        allowWhileIdle: true,
                                        every: alarme.every,
                                        count: cont
                                    }
                                }]
                        })

                    }

                }



                return true
            } catch (error) {
                return false
            }
        },
        async setAlarme(alarme: iAlarme) {
            try {

                //Get id
                const id = await this.getId()
                alarme.id = id

                await this.setLocalNotification(alarme)
                this.alarmes.push(alarme)

                await this.saveAlarmes()

                return true

            } catch (error) {
                return false
            }

        },
        async cancelNotification(id: number) {
            try {

                //Eliminar grupo de alarma 7 
                for (let i = 0; i < 8; i++) {

                    //Cancelar Notification
                    await LocalNotifications.cancel({
                        notifications: [
                            {
                                id: (id + i)
                            }
                        ]
                    })

                    //Cancelar Alarm
                    await clockAlarm.removeAlarm({
                        id: (id + i)
                    })

                }


                return true
            } catch (error) {
                return false
            }
        },
        async delete(id: number) {

            try {

                await this.cancelNotification(id)
                const index = this.alarmes.findIndex(e => e.id === id)
                await this.alarmes.splice(index, 1)
                this.saveAlarmes()

            } catch (error) {
                console.log(error)
            }

        },
        async updateAlarme(alarme: iAlarme): Promise<void> {
            try {
                const index = this.alarmes.findIndex(al => al.id === alarme.id)
                this.alarmes[index] = alarme
            } catch (error) {
                console.log(error)
            }
        },
        async repeatActive(alarme: iAlarme): Promise<boolean> {
            try {

                await this.cancelNotification(alarme.id)
                await this.updateAlarme(alarme)
                await this.setLocalNotification(alarme)

                this.saveAlarmes()

                return true
            } catch (error) {
                return false
            }
        },
        async repeatDesactive(alarme: iAlarme) {

            try {
                await this.cancelNotification(alarme.id)
                await this.updateAlarme(alarme)

                this.saveAlarmes()
            } catch (error) {
                console.log(error)
                return false
            }

        }
    }
}) 