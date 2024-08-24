import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error capturado por el middleware:", err.message);
    console.error(err.stack); // Registrar el error para depuración
    const statusCode = err.statusCode || 500; // Establecer un código de estado si no hay alguno
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
