import { AppointmentModel, UserModel } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
    try {
        const appointments = await AppointmentModel.find({
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
        const appointment = await AppointmentModel.findOneBy({id})
        return appointment;
    } catch (error) {
        throw error;
    }
};

export const scheduleAppointmentService = async (appointment: AppointmentDto): Promise<Appointment> => {
    if (!appointment.userId) { throw new Error("El ID dl usuario es obligatorio para crear un turno.");}
    
    const user = await UserModel.findOneBy({id: appointment.userId});

    if (!user) { throw new Error("Usuario no encontrado.");}

    const newAppointment = await AppointmentModel.create(appointment);
    await AppointmentModel.save(newAppointment);

    if(user){
        newAppointment.user = user;
        AppointmentModel.save(newAppointment);
    }
    return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
    const appointment = await AppointmentModel.findOneBy({ id });
    if (!appointment) {
        throw new Error("El turno no existe.");
    }
    appointment.status = "cancelled";
    await AppointmentModel.save(appointment);
};