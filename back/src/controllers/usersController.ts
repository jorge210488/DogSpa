import { Request, Response } from "express";
import { getUserService, getUsersService, createUserService, deleteUserService } from "../services/usersService";
import { createCredential, validateCredential } from "../services/credentialsService";
import { Credential } from "../entities/Credential";
import { UserModel } from "../config/data-source";

export const getUsers = async (req: Request, res: Response) => {
    const users = await getUsersService();
    res.status(200).json(users);
};  

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const userId = Number(req.params.id); 
    const user = await getUserService(Number(id)); // Llama al servicio con el id convertido
    res.status(200).json(user); 
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body;
    await deleteUserService(id);
    res.status(200).json({ message: "Eliminado correctamente" });
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const credentialId = await validateCredential({ username, password });
    res.status(200).json(credentialId);
};

export const createUser = async (req: Request, res: Response) => {
    const { username, password, name, email, birthdate, nDni } = req.body;
    const credential = await createCredential({ username, password });
    const newUser = await createUserService({ name, email, birthdate, nDni, credentialsId:credential.id});
    //asociar nuevo usuario a su credencial
    newUser.credentials = credential;
    //guardando base datos
    await UserModel.save(newUser);
    res.status(201).json(newUser);
};



