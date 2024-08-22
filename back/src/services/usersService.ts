import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUser";


let users: IUser[] = [];

let id: number = 1;

export const getUserService = async (id: number): Promise<IUser | undefined> => {
    const user = users.find((user: IUser) => user.id === id);
    return user;
};

export const getUsersService = async ():Promise<IUser[]> => {
    return users;
};

export const createUserService = async (userData: UserDto): Promise<IUser> => {
    const newUser: IUser = {
        id,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialsId: userData.credentialsId,
    };

    users.push(newUser);
    id++;
    return newUser;
};


export const deleteUserService = async (id:number): Promise<void> => {
    users = users.filter((user: IUser) => {
        return user.id !== id;
    })
};



