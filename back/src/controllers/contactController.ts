import { Request, Response, NextFunction } from "express";
import { mailService } from "../services/mailService";

export const contactController = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, comment } = req.body;
    if (!name || !email || !comment) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    try {
        await mailService.sendMail(
            'jorgemartinez.jam@gmail.com', 
            `Repositorio DogSpa - Nuevo mensaje de ${name}`, 
            comment,
            `<p>${comment}</p><p>Email contacto: ${email}</p>` // HTML opcional
        );
        res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error enviando el correo:", error);
        next(error); 
    }
};
