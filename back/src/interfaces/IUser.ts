interface IUser {
    id: number,
    name: string,
    email: string,
    birthdate: Date | string;
    nDni: number,
    credentialsId: number,
}

export default IUser;
