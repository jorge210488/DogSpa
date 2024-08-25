import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
    try {
        const appointments = await AppointmentRepository.find({
            relations: {
                user: true
            }
        });
        return appointments;
    } catch (error) {
        throw error;
    }
};

export const getAppointmentService = async (id: number): Promise<Appointment | null> => {
    try{
        const appointment = await AppointmentRepository.findOneBy({id})
        return appointment;
    } catch (error) {
        throw error;
    }
};

export const scheduleAppointmentService = async (appointment: AppointmentDto): Promise<Appointment> => {
    try{
        //Busco el usuario por Id y además arrojo error ni si no existe 
    const user = await UserRepository.findById(appointment.userId);

    const newAppointment = await AppointmentRepository.create(appointment);
    await AppointmentRepository.save(newAppointment);
        newAppointment.user = user;
        AppointmentRepository.save(newAppointment);
    
    return newAppointment;
    }  catch (error: any) {
        if (error.message === "Invalid ID") {error.statusCode = 400;}
        throw error;
}
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
    try{
    const appointment = await AppointmentRepository.findOneBy({ id });
    if (!appointment) {
        throw new Error("El turno no existe.");
    }
    appointment.status = "cancelled";
    await AppointmentRepository.save(appointment);
} catch (error: any) {
    throw error; 
}
};