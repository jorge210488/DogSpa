import { Request, Response, NextFunction } from "express";
import CredentialRepository from "../repositories/CredentialRespository";

export const validateCredential = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan las credenciales" });
    }

    // Verifica si el username ya existe en la base de datos
    const credential = await CredentialRepository.findOne({ where: { username } });

    if (credential) {
        return res.status(409).json({ message: "El username ya existe" });
    }

    next();
};



