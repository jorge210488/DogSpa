import { Request, Response, NextFunction} from "express";
import { getAppointmentService, getAppointmentsService, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const appointments = await getAppointmentsService();
    res.status(200).json(appointments);
    }catch (error: any){
        next(error);
    }
};  

export const getAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const appointmentId = Number(req.params.id); 
    const appointment: Appointment | null = await getAppointmentService(appointmentId); 
    if (!appointment) {
        return res.status(404).json({ message: "Turno no encontrado" });
    }
        res.status(200).json(appointment); 
    } catch (error: any){
        next(error);
    }
};

export const scheduleAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, time, userId } = req.body;
        if (!date || !time || !userId) {
            return res.status(400).json({ message: "Datos incorrectos" });
        }
        const newAppointment: Appointment = await scheduleAppointmentService({ date, time, userId });
        res.status(201).json(newAppointment);
    } catch (error: any) {
        if (error.statusCode === 400 || error.message === "Invalid ID") {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

export const cancelAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const appointmentId = Number(req.body.id);  

    if (appointmentId !== Number(req.params.id)) {
        return res.status(404).json({ message: "El ID en la ruta no coincide con el ID en el cuerpo de la solicitud." });
    }
    await cancelAppointmentService(appointmentId);
    res.status(200).json({ message: "El turno ha sido cancelado exitosamente" });
    }catch (error: any) {
        if (error.message === "El turno no existe.") {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};
