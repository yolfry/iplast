
interface peso {
    kg: number;
    lb: number;
    st: number;
}

interface altura {
    cm: number;
    ft: number;
    in: number;
    m: number;
}

//Functions o methodos
async function calIMC(peso: peso, altura: altura, typePeso: any, typeAltura: any, IMC: any, sexo: string) {
    //Algoridmo de Calcular IMC

    //Var Input Operathor
    let pesoKg: number = peso.kg; //Peso en Kilogramo
    const pesoLb: number = peso.lb; //peso en Libra
    const pesoSt: number = peso.st; //peso en Libra
    let alturaM: number = peso.kg; //Altura en Metro
    const alturaCM: number = altura.cm; //Altura en Centimetro
    const alturaFt: number = altura.ft; //Altura en Pie
    const alturaIn: number = altura.in; //Altura en pulgada

    // let pesoType: string = peso.type; //Tipo de Operacion IMC por Peso
    // let pesoAltura: string = altura.type; // Tipo de Operacion IMC por Altura

    // Libra a Kilogramos, una libra es igual a 0.453592
    if (typePeso.value == "LB") {
        pesoKg = pesoLb * 0.453592;
    }

    //ST+LB Stonia a Kilogramos
    if (typePeso.value == "ST+LB") {
        pesoKg = pesoSt * 6.35029 + pesoLb * 0.453592;
    }


    // Centimetros a Metros, un centimetro es igual a 0.01 metro
    if (typeAltura.value == "CM") {
        alturaM = alturaCM * 0.01;
    }

    //Converte Pie mas pulgada a metro
    if (typeAltura.value == "FT+IN") {
        alturaM = alturaFt * 0.3048 + alturaIn * 0.0254;
    }

    //Formula
    // IMC = peso (kg) / altura 2 (M)
    const formula: number = pesoKg / Math.pow(alturaM, 2);

    if (formula) {
        IMC.value = await formula.toFixed(2); // Obten 2 decimal de un numero flotante
    } else {
        IMC.value = 0;
    }

    // Indice de masa Corporal
    // console.log(IMC.value);


    //peso ideal
    const alturaenCentimetros = alturaM * 100;

    // Formula Aplicada para Mujer
    // const pesoIdeal = pesoCentimetros - 100 + ((edad / 10) * 0.9)

    // let pesoIdeal: number

    // if (sexo == "woman") {
    //     pesoIdeal = 0.75 * pesoCentimetros - 56.25;
    // } else {
    //     pesoIdeal = 0.75 * pesoCentimetros - 62.5;
    // }

    // let pesoIdeal = 50 + ((alturaenCentimetros - 150) / 4) * 3 + (edad - 20) / 4
    // if (sexo == "woman") {
    //     pesoIdeal = pesoIdeal * 0.9;
    // }

    let pesoIdeal: number
    let recomendado: number

    if (sexo == "woman") {
        pesoIdeal = (alturaenCentimetros - 150) * 0.6 + 50
        recomendado = 0.63
    } else {
        pesoIdeal = (alturaenCentimetros - 150) * 0.75 + 50
        recomendado = 0.556
    }

    // const pesoIdeal = 50 + ((alturaM - 150) / 4) * 3 + (edad - 20) / 4;
    const pesoRecomendado = pesoIdeal + (pesoIdeal * recomendado); //0.40 //0.55


    return {
        pesoKg,
        alturaM,
        IMC: IMC.value,
        pesoIdeal,
        pesoRecomendado
    }

}

/*@peso = kilogramo */
const converte = (peso: number, typePeso: string) => {

    //Solo permite la conversion de libra

    // Libra a Kilogramos, una libra es igual a 0.453592
    if (typePeso == "LB") {
        peso = peso / 0.453592;
    }

    if (typePeso == "ST+LB") {
        peso = peso / 0.453592;
        typePeso = "LB" // NO SE PODRA CONVERTIR A STONIA
    }

    return { peso, typePeso }
}


export { calIMC, converte };