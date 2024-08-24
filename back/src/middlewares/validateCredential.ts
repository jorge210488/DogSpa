import { Request, Response, NextFunction } from 'express';
import ICredential from "../interfaces/ICredential"

export const validateCredential = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan las credenciales" });
    }

    // Verifica si el username ya existe en el array credentials (Para crear el usuario)
    const credential = credentials.find((cred: ICredential) => cred.username === username);
    
    if (credential) {
        return res.status(409).json({ message: "El username ya existe" });
    }
    next();
};


