import { BarcodeScanner } from '@capacitor-community/barcode-scanner'

const scanImg = `

<div style="width: 50%; margin: 0 auto; margin-top: 20rem;" id="scanImg" class="scanImghidden">

<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 24.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 586 468" style="enable-background:new 0 0 586 468;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;}
	.st1{fill:#00AABB;}
	.st2{fill:#293B7E;}
	.st3{clip-path:url(#SVGID_2_);fill:#293B7E;}
	.st4{clip-path:url(#SVGID_2_);}
	.st5{fill:#63BECD;}
	.st6{fill:#FFC000;}
	.st7{fill:#B2BEC7;}
	.st8{fill:#FF8F00;}
	.st9{fill:#213268;}
	.st10{fill:#FFFF6C;}
	.st11{fill:#82BCC5;}
	.st12{fill:#735E61;}
	.st13{fill:#FF7C0C;}
	.st14{fill:#FF7664;}
	.st15{fill:#B2460A;}
	.st16{fill:#FF1238;}
	.st17{fill:#FF3232;}
	.st18{fill:#FFA86D;}
	.st19{fill:#0091B4;}
	.st20{fill:#AF9FA2;}
	.st21{fill:#4195A6;}
	.st22{fill:#B3B3BB;}
	.st23{fill:#FC932D;}
	.st24{fill:#C1C1C1;}
	.st25{fill:#58FFE3;}
	.st26{fill:#006D95;}
	.st27{fill:#C4D6F2;}
	.st28{fill:#AAB2E7;}
	.st29{fill:#FF5100;}
	.st30{fill:#FFE3A1;}
	.st31{fill:#46383B;}
	.st32{fill:#89787C;}
	.st33{fill:#8E8EB1;}
	.st34{fill:#7F1E00;}
	.st35{fill:none;}
	.st36{clip-path:url(#SVGID_4_);}
	.st37{clip-path:url(#SVGID_6_);fill:#00AABB;}
	.st38{clip-path:url(#SVGID_6_);fill:#293B7E;}
	.st39{fill:#17244F;}
	.st40{clip-path:url(#SVGID_8_);}
	.st41{clip-path:url(#SVGID_10_);fill:#00AABB;}
	.st42{clip-path:url(#SVGID_10_);fill:#293B7E;}
	.st43{fill-rule:evenodd;clip-rule:evenodd;fill:#00AABB;}
	.st44{opacity:0.45;}
	.st45{fill:none;stroke:#000000;stroke-width:12;stroke-miterlimit:10;}
	.st46{fill:#FC5E5E;}
	.st47{fill:none;stroke:#FFFFFF;stroke-width:3;stroke-miterlimit:10;}
</style>
<g class="st44">
	<path d="M144.1,175.6c0,7.1-8.9,12.1-16.1,4.5c-0.3-0.3-0.5-0.8-0.5-1.2v-69.3c0-4.7,3.8-8.6,8.6-8.6l69.3,0c0.4,0,0.9,0.2,1.2,0.5
		c7.6,7.2,2.6,16.1-4.5,16.1h-52.9c-2.8,0-5.1,2.3-5.1,5.1V175.6z M384.9,117.6c-7.1,0-12.1-8.9-4.5-16.1c0.3-0.3,0.8-0.5,1.2-0.5
		l69.3,0c4.7,0,8.6,3.8,8.6,8.6v69.3c0,0.4-0.2,0.9-0.5,1.2c-7.2,7.6-16.1,2.6-16.1-4.5v-52.9c0-2.8-2.3-5.1-5.1-5.1H384.9z
		 M202.1,349.5c7.1,0,12.1,8.9,4.5,16.1c-0.3,0.3-0.8,0.5-1.2,0.5l-69.3,0c-4.7,0-8.6-3.8-8.6-8.6v-69.3c0-0.4,0.2-0.9,0.5-1.2
		c7.2-7.6,16.1-2.6,16.1,4.5v52.9c0,2.8,2.3,5.1,5.1,5.1H202.1z M442.9,291.5c0-7.1,8.9-12.1,16.1-4.5c0.3,0.3,0.5,0.8,0.5,1.2v69.3
		c0,4.7-3.8,8.6-8.6,8.6l-69.3,0c-0.4,0-0.9-0.2-1.2-0.5c-7.6-7.2-2.6-16.1,4.5-16.1h52.9c2.8,0,5.1-2.3,5.1-5.1V291.5z
		 M177.2,159.1c0-4.9,4.2-8.8,9.2-8.2c4.2,0.5,7.3,4.2,7.3,8.5V308c0,4.3-3.1,8-7.3,8.5c-5,0.5-9.2-3.3-9.2-8.2V159.1z M226.9,159.1
		c0-4.9,4.2-8.8,9.2-8.2c4.2,0.5,7.3,4.2,7.3,8.5V308c0,4.3-3.1,8-7.3,8.5c-5,0.5-9.2-3.3-9.2-8.2V159.1z M260.7,159.1
		c0-4.9,4.2-8.8,9.2-8.2c4.2,0.5,7.3,4.2,7.3,8.5V308c0,4.3-3.1,8-7.3,8.5c-5,0.5-9.2-3.3-9.2-8.2V159.1z M293.8,159.1
		c0-4.9,4.2-8.8,9.2-8.2c4.2,0.5,7.3,4.2,7.3,8.5V308c0,4.3-3.1,8-7.3,8.5c-5,0.5-9.2-3.3-9.2-8.2V159.1z M360.1,159.1
		c0-4.9,4.2-8.8,9.2-8.2c4.2,0.5,7.3,4.2,7.3,8.5V308c0,4.3-3.1,8-7.3,8.5c-5,0.5-9.2-3.3-9.2-8.2V159.1z M393.2,159.1
		c0-4.9,4.2-8.8,9.2-8.2c4.2,0.5,7.3,4.2,7.3,8.5V308c0,4.3-3.1,8-7.3,8.5c-5,0.5-9.2-3.3-9.2-8.2V159.1z"/>
</g>
<path class="st45" d="M496.3,441H84.7c-33.8,0-61.2-27.4-61.2-61.2V82.2C23.5,48.4,50.9,21,84.7,21h411.6
	c33.8,0,61.2,27.4,61.2,61.2v297.6C557.5,413.6,530.1,441,496.3,441z"/>
<g>
	<circle class="st46" cx="531.5" cy="51" r="46"/>
	<g>
		<line class="st47" x1="506.5" y1="65.1" x2="558.1" y2="35.6"/>
		<line class="st47" x1="518.7" y1="25.2" x2="545.9" y2="78.1"/>
	</g>
</g>
</svg>

</div>


`

class codeScan {
    public static isScanCode: boolean = false
}

class createCodeScan {

    private head: HTMLElement | null
    private styleCodeScan: HTMLElement | null



    private insetHTML() {



        //Agregar stilos HTML
        if (!this.styleCodeScan) {

            if (this.head) {
                this.head.innerHTML += `
                   <style id="styleCodeScan">
                      .scanner-active {
                          display: none;
                        }
                        html.ion-ce .scanner-active {
                            display: none;
                        }
                        .scanImghidden{
                            display: none;
                        }
                        
                   </style>
                 `
            } else {
                console.log(`No se encuentra el header`)
            }

        } else {
            console.log(`Este elemento ya existe`)
        }


        //Body add Image
        const bosy = document.querySelector('body')
        if (bosy) {
            bosy.innerHTML += scanImg
        }


    }

    constructor() {
        this.head = document.querySelector('head')
        this.styleCodeScan = document.querySelector('styleCodeScan')
        //Inicial HTML
        this.insetHTML()
    }

}

const hiddenScan = () => {
    const app = document.querySelector('#app')
    const body = document.querySelector('body')
    const scanImg = document.querySelector('#scanImg')

    body?.classList.remove('isCamera')
    app?.classList.remove('scanner-active')
    scanImg?.classList.add('scanImghidden')
}

const showScan = () => {
    const app = document.querySelector('#app')
    const scanImg = document.querySelector('#scanImg')
    const body = document.querySelector('body')

    body?.classList.add('isCamera')
    app?.classList.add('scanner-active')
    scanImg?.classList.remove('scanImghidden')

    //Evento hidden
    scanImg?.addEventListener('click', async () => {
        await stopCodeScan()
    })

}


const startCodeScan = async () => {



    try {
        codeScan.isScanCode = true

        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true })


        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        await BarcodeScanner.hideBackground() //Ocultar fondo
        //BarcodeScanner.showBackground();


        showScan()





        const result = await BarcodeScanner.startScan() // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            codeScan.isScanCode = false
            hiddenScan()
            BarcodeScanner.showBackground()
            return result.content
        } else {
            throw new Error(`Error para obtener el code result.hasContent`)
        }
    } catch (error: any) {
        console.log(error.message)
        hiddenScan()
    }

}


const stopCodeScan = async (): Promise<boolean> => {


    try {

        await BarcodeScanner.showBackground()
        hiddenScan()
        await BarcodeScanner.stopScan()
        codeScan.isScanCode = false

        return true
    } catch (error: any) {
        hiddenScan()
        console.log(error.message)
        return false
    }

}




export { createCodeScan, startCodeScan, stopCodeScan, codeScan }