import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export const getUserService = async (id: number): Promise<User | null> => {
    try {
        const user = await UserRepository.findOne({
            where: { id },
            relations: ["appointments"]
        });
        if (!user) { return null; }
        return user;
    } catch (error: any) { throw new Error(`Error al obtener el usuario con ID ${id}: ${error.message}`);
    }
};

export const getUsersService = async (): Promise<User[]> => {
    try {
        const users = await UserRepository.find({
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
        const user = await UserRepository.create(userData);
        await UserRepository.save(user);
        return user;
    } catch (error: any) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

export const deleteUserService = async (id: number): Promise<void> => {
    try {
        const user = await UserRepository.findOne({ where: { id } });
        if (!user) { throw new Error("Usuario no encontrado"); }
        await UserRepository.remove(user);
    } catch (error: any) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
};

