import { Request, Response, NextFunction } from "express";
import { getUserService, getUsersService, createUserService, deleteUserService } from "../services/usersService";
import { createCredential, validateCredential } from "../services/credentialsService";
import UserRepository from "../repositories/UserRepository";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await getUserService(Number(id));
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error: any) {
        next(error); 
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;

        if (!id) { return res.status(400).json({ message: "Falta el ID del usuario" });}
        await deleteUserService(id);
        res.status(200).json({ message: "Eliminado correctamente" });
    } catch (error: any) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }
        const credentialId = await validateCredential({ username, password });
        const user = await UserRepository.findOne({ where: { credentials: { id: credentialId } }, relations: ["credentials"] });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({
            login: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,
            }
        });
    } catch (error: any) {
               if (error.message === "Credenciales incorrectas") {
                return res.status(400).json({ message: error.message });
            }
            next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, name, email, birthdate, nDni } = req.body;
        if (!username || !password || !name || !email || !birthdate || !nDni) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }
        const credential = await createCredential({ username, password });
        const newUser = await createUserService({name, email,birthdate, nDni,credentialsId: credential.id,});
        newUser.credentials = credential;
        await UserRepository.save(newUser);
        res.status(201).json(newUser);
    } catch (error: any) {
        next(error);
    }
};



