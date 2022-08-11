

// Message is function for mesage i18n notification error
export default async function openAlert(e: string | number /* i18n String*/, t: any, alertController: any, header = 'Alert', subHeader = ''): Promise<string> {

    const toast = await alertController
        .create({
            header,
            subHeader,
            message: await t(e),
            buttons: ['OK']
        })

    // {
    //         header: 'Alert',
    //         subHeader: 'Important message',
    //         message: 'This is an alert!',
    //         buttons: ['OK']
    //       }

    await toast.present()

    return t(e)

}