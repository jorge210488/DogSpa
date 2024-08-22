import AppointmentDto from "../dto/AppointmentDto";
import IAppointment from "../interfaces/IAppointment";


let appointments: IAppointment[] = [];

let id: number = 1;

export const getAppointmentsService = async ():Promise<IAppointment[]> => {
    return appointments;
};

export const getAppointmentService = async (id: number): Promise<IAppointment | undefined> => {
    const appointment = appointments.find((appointment: IAppointment) => appointment.id === id);
    return appointment;
};

export const scheduleAppointmentService = async (appointmentData: AppointmentDto): Promise<IAppointment> => {
    if (!appointmentData.userId) { throw new Error("El ID del usuario es obligatorio para crear un turno.");}

    const newAppointment: IAppointment = {
        id,
        date: appointmentData.date,
        time: appointmentData.time,
        userId: appointmentData.userId,
        status: appointmentData.status || "active",
  
    };

    appointments.push(newAppointment);
    id++;
    return newAppointment;
};


export const cancelAppointmentService = async (id: number): Promise<void> => {
    appointments = appointments.map((appointment: IAppointment) => {
        if (appointment.id === id) {
            // Cambia el estatus del turno a "cancelled"
            return { ...appointment, status: "cancelled" };
        }
        return appointment;
    });
};

