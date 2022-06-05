
// Objeto Peso
const peso = {
    'type': 'kg-kg',  // kg, lb
    'kg': 50,
    'lb': 0
}

//Objeto Altura
const altura = {
    'type': 'cm-m', // (FT + IN), CM, M
    'm': null,
    'ft': 0,
    'in': 0,
    'cm': 150
}


// Libra a Kilogramos, una libra es igual a 0.453592
if (peso.type == 'lb-kg') {
    peso.kg = (peso.lb * 0.453592)
}


// Centimetros a Metros, un centimetro es igual a 0.01 metro
if (altura.type == 'cm-m') {
    altura.m = (altura.cm * 0.01)
}

//Converte Pie mas pulgada a metro
if (altura.type == 'ft+in-m') {
    altura.m = ((altura.ft * 0.3048) + (altura.in * 0.0254))
}


//Formula
// IMC = peso (kg) / altura 2 (M)
var IMC = peso.kg / (Math.pow(altura.m, 2));


// Indice de masa Corporal
console.log(IMC)
