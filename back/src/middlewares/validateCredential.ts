import { Request, Response, NextFunction } from 'express';
import { credentials } from '../services/credentialsService';
import ICredential from "../interfaces/ICredential"

export const validateCredential = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan las credenciales" });
    }

    const credential = credentials.find((cred: ICredential) => cred.username === username);

    // Verificar si las credenciales coinciden
    if (credential && credential.password === password) {
        next();
    } else {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }
};


