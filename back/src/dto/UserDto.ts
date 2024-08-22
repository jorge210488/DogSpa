interface UserDto {
    name: string,
    email: string,
    birthdate: Date | string;
    nDni: number,
    credentialsId: number,
}

export default UserDto;
