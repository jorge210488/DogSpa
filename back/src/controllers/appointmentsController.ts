import { Request, Response, NextFunction} from "express";
import { getAppointmentService, getAppointmentsService, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";
import { mailService } from '../services/mailService';
import AppointmentRepository from "../repositories/AppointmentRepository";

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
        const appointmentId = Number(req.params.id);
        const appointment = await AppointmentRepository.findOne({
            where: { id: appointmentId },
            relations: ['user'],
        });
        if (!appointment) {
            return res.status(404).json({ message: "El turno no existe." });
        }
        await cancelAppointmentService(appointment);

        // Enviar correo de notificación al usuario
        const userEmail = appointment.user.email;
        const userName = appointment.user.name;
        const appointmentDate = appointment.date;
        const appointmentTime = appointment.time;

        await mailService.sendMail(
            userEmail,
            'DogSpa Cita Cancelada',
            `Hola ${userName},\n\nLamentamos informarte que tu cita para el ${appointmentDate} a las ${appointmentTime} ha sido cancelada.`
        );

        res.status(200).json({ message: "El turno ha sido cancelado exitosamente" });
    } catch (error: any) {
        console.error('Error in cancelAppointment:', error);
        next(error);
    }
};


