import { UserModel, CredentialModel } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";

export const getUserService = async (id: number): Promise<User | null> => {
    const user = await UserModel.findOneBy({id})
    return user;
};

export const getUsersService = async (): Promise<User[]> => {
    const users = await UserModel.find({
            relations: {
                credentials: true
            }
});
    return users;
};

export const createUserService = async (userData: UserDto): Promise<User> => {
    const user = await UserModel.create(userData);
    await UserModel.save(user);
    return user;
};

export const deleteUserService = async (id: number): Promise<void> => {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) { throw new Error("Usuario no encontrado");}
    await UserModel.remove(user);
};




