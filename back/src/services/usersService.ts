import { UserModel } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export const getUserService = async (id: number): Promise<User | null> => {
    try {
        const user = await UserModel.findOneBy({ id });
        if (!user) { return null; }
        return user;
    } catch (error: any) { throw new Error(`Error al obtener el usuario con ID ${id}: ${error.message}`);
    }
};

export const getUsersService = async (): Promise<User[]> => {
    try {
        const users = await UserModel.find({
            relations: {
                credentials: true
            }
        });
        return users;
    } catch (error: any) {
        throw new Error(`Error al obtener los usuarios: ${error.message}`);
    }
};

export const createUserService = async (userData: UserDto): Promise<User> => {
    try {
        const user = await UserModel.create(userData);
        await UserModel.save(user);
        return user;
    } catch (error: any) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

export const deleteUserService = async (id: number): Promise<void> => {
    try {
        const user = await UserModel.findOne({ where: { id } });
        if (!user) { throw new Error("Usuario no encontrado"); }
        await UserModel.remove(user);
    } catch (error: any) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
};

