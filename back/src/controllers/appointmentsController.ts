import { Request, Response } from "express";
import { getAppointmentService, getAppointmentsService, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

export const getAppointments = async (req: Request, res: Response) => {
    const appointments: Appointment[] = await getAppointmentsService();
    res.status(200).json(appointments);
};  

export const getAppointment = async (req: Request, res: Response) => {
    const appointmentId = Number(req.params.id); 
    const appointment: Appointment | null = await getAppointmentService(appointmentId); 
        res.status(200).json(appointment); 
};

export const scheduleAppointment = async (req: Request, res: Response) => {
    const { date, time, userId, status } = req.body;
    const newAppointment: Appointment = await scheduleAppointmentService({ date,  time, userId, status });
    res.status(201).json(newAppointment);
};

export const cancelAppointment = async (req: Request, res: Response) => {
    const appointmentId = Number(req.body.id);  
    await cancelAppointmentService(appointmentId);
    res.status(200).json({ message: "El turno ha sido cancelado exitosamente" });
};
