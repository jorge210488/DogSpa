import { Request, Response, NextFunction } from "express";
import CredentialRepository from "../repositories/CredentialRespository";
import UserRepository from "../repositories/UserRepository";

export const validateCredential = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, nDni } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan las credenciales" });
    }

    const credential = await CredentialRepository.findOne({ where: { username } });
    if (credential) {
        return res.status(409).json({ message: "El username ya existe" });
    }

    const existingUserByEmail = await UserRepository.findOne({ where: { email } });
    if (existingUserByEmail) {
        return res.status(409).json({ message: "El email ya existe" });
    }

    const existingUserByDni = await UserRepository.findOne({ where: { nDni } });
    if (existingUserByDni) {
        return res.status(409).json({ message: "El nDni ya existe" });
    }

    next();
};
