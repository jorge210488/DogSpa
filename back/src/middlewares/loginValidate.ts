import { Request, Response, NextFunction } from "express";

export const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan Datos de las credenciales" });
    }

    next();
};
