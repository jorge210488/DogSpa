import { Request, Response, NextFunction } from "express";
import { getUserService, getUsersService, createUserService, deleteUserService } from "../services/usersService";
import { updateUserProfileImageService } from "../services/updateUserProfileImageService";
import { createCredential, validateCredential } from "../services/credentialsService";
import UserRepository from "../repositories/UserRepository";
import { mailService } from '../services/mailService';


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
        const credentialId = await validateCredential({ username, password });

        if (!credentialId) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const user = await UserRepository.findOne({
            where: { credentials: { id: credentialId } },
            relations: ["credentials"],
        });

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
                profileImage: user.profileImage, // Incluimos la imagen de perfil 
            },
        });
    } catch (error: any) {
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

        await mailService.sendMail(
            email,
            'Bienvenido a DogSpa',
            `Hola ${name},\n\nGracias por registrarte en DogSpa, estamos contentos de tenerte aquí, espero podamos darle un día de relajación y disfrute a tu perrito!.`
        );

        res.status(201).json(newUser);
    } catch (error: any) {
        next(error);
    }
};

export const updateUserProfileImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id); 
        const imagePath = req.file?.path; // Extrae la ruta temporal de la imagen que ha sido cargada en el servidor a través del middleware multer. req.file?.path accede a la ruta de la imagen almacenada temporalmente

        if (!imagePath) {
            return res.status(400).json({ message: "No se ha proporcionado ninguna imagen." });
        }

        const updatedUser = await updateUserProfileImageService(userId, imagePath);
        res.status(200).json({ message: "Imagen de perfil actualizada exitosamente", user: updatedUser });
    } catch (error: any) {
        console.error("Error en updateUserProfileImage:", error.message);
        next(error);
    }
};


