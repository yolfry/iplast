import { iAlarme } from "@/interfaces/iAlarme";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import { LocalNotifications, PermissionStatus, Schedule, ScheduleOptions } from "@capacitor/local-notifications";
//capacitor-alarm-notification
import { clockAlarm } from 'capacitor-clock-alarm'



export const useAlarmeStore = defineStore(`alarmeStore`, {
    state: () => {
        return {
            alarmes: [] as iAlarme[],
            addModalAlame: false
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
                    await appStore.saveDataApp('idNotificationCont', parseInt(resData) + 1)
                    return parseInt(resData) + 1
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


                const alarmeOption = {
                    id: alarme.id,
                    autoCancel: true,
                    title: `Iplast Alarm ${alarme.alarmeCategory}`,
                    body: alarme.body,
                    summaryText: alarme.body,
                    smallIcon: 'icon_' + alarme.alarmeCategory,
                    largeIcon: 'icon_' + alarme.alarmeCategory,
                    iconColor: alarme.color,
                }


                //Declare Schedule
                const schedule: Schedule = {
                    allowWhileIdle: true
                }



                //Alarme Repeat Cada x dia
                if (alarme.repeat && alarme.count && alarme.every) {
                    schedule.every = alarme.every
                    schedule.count = alarme.count


                    //Clock Alarme
                    await clockAlarm.setAlarm({
                        id: alarme.id,
                        message: alarme.body,
                        repeats: alarme.repeat,
                        every: alarme.every,
                        count: alarme.count
                    })

                }

                //Alarma Repetir el dia y la fecha y hora espesifico
                if (alarme.repeat && !alarme.count) {
                    const at = new Date(alarme.at)

                    schedule.at = at
                    schedule.repeats = alarme.repeat

                    //Clock Alarme
                    await clockAlarm.setAlarm({
                        at: alarme.at,
                        id: alarme.id,
                        message: alarme.body,
                        repeats: alarme.repeat,
                    })

                }

                //Alarme por fecha directa
                if (!alarme.repeat) {
                    const at = new Date(alarme.at)
                    schedule.at = at

                    //Clock Alarme
                    await clockAlarm.setAlarm({
                        at: alarme.at,
                        id: alarme.id,
                        message: alarme.body
                    })

                }



                const notifications: ScheduleOptions = {
                    notifications: [{
                        ...alarmeOption,
                        schedule: { ...schedule }
                    }]
                }

                const resLocalNotification = await LocalNotifications.schedule(notifications)
                if (!resLocalNotification) {
                    throw new Error("No alarme");
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
                //Cancelar Notification
                await LocalNotifications.cancel({
                    notifications: [
                        {
                            id
                        }
                    ]
                })
                return true
            } catch (error) {
                return false
            }
        },
        async delete(id: number) {

            try {

                await clockAlarm.removeAlarm({
                    id: id
                });

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