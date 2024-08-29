import { Request, Response, NextFunction } from "express";
import { TimeRange } from "../helpers/enumTime"; // Asegúrate de importar el enum desde la ubicación correcta

// Función para validar que el rango de tiempo esté dentro de los valores permitidos en el enum
function isValidTimeRange(time: string): boolean {
    return Object.values(TimeRange).includes(time as TimeRange);
}

// Función para validar que el día sea de lunes a sábado
function isValidDay(date: string): boolean {
    const parsedDate = new Date(Date.parse(date));
    const dayOfWeek = parsedDate.getUTCDay();
    return dayOfWeek >= 1 && dayOfWeek <= 6;
}

export const validateAppointment = (req: Request, res: Response, next: NextFunction) => {
    const { date, time } = req.body;

    // Validar que el time esté dentro de los valores permitidos
    if (!isValidTimeRange(time)) {
        return res.status(400).json({ message: "El horario debe estar dentro de los rangos permitidos y no debe exceder las 2 horas." });
    }

    // Validar que el día esté entre lunes y sábado
    if (!isValidDay(date)) {
        return res.status(400).json({ message: "Los turnos solo pueden agendarse de lunes a sábado." });
    }

    // Si pasa las validaciones, continuar con el siguiente middleware o controlador
    next();
};
