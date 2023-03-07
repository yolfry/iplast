interface iUser {
    username: string | undefined;
    password: string | undefined;
    appConnect: string | undefined;
    keyUser: string | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    code: string | undefined;
    numberCode: string;
    newPassword: string | undefined;
    removeSections: boolean
}

export default iUser