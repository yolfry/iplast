
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
async function calIMC(peso: peso, altura: altura, typePeso: any, typeAltura: any, IMC: any) {
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

    return {
        pesoKg,
        alturaM,
        IMC: IMC.value
    }

}


export { calIMC };