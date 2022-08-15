

interface iregExps {
    username: RegExp;
    email: RegExp;
    phone: RegExp;
    password: RegExp;
    codePhone: RegExp;
    name: RegExp;
    code: RegExp;
}

const regExps: iregExps = {
    username: /^[a-zA-Z0-9@]+[._a-zA-Z0-9@]{3,34}$/,
    email: /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
    phone: /^[(]?\d{3}[)]?\s?-?[.]?\d{3}\s?-?[.]?\d{4}$/,
    password: /^\S(.|\s){7,200}$/,
    codePhone: /^\+?\d{1,5}$/,
    name: /^[a-zA-Z]{3,20} ?[a-zA-Z]{2,40}?$/,
    code: /^\d{6}$/,

}

export default regExps

// User Name
// Frances
// Errores de Login Traduccion
// Que pueda ver la contrase;a
// Recordad la contrase;a 

