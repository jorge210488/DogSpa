import { AppDataSource } from "../config/data-source";
import IAppointment from "../interfaces/IAppointment";
import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser";
import UserRepository from "../repositories/UserRepository";
import AppointmentRepository from "../repositories/AppointmentRepository";
import CredentialRepository from "../repositories/CredentialRespository";

const preloadUsers = [{
    user: {
        name: "Jorge M",
        email: "prueba@email.com",
        birthdate: "12/05/1995",
        nDni: 90556545,
    } as IUser, 
    credential: {
        username: "jorge95",
        password: "1234"
    } as ICredential  
}];


export const preloadUsersAndCredentials = async () => {
    const users = await UserRepository.find();
    if (users.length) return console.log("No se hizo la precarga de datos porque ya hay usuarios");
    
    for (const data of preloadUsers) {
        const newCredential = await CredentialRepository.create(data.credential);
        await CredentialRepository.save(newCredential);
        const newUser = await UserRepository.create({ 
            ...data.user, 
            credentials: newCredential
        });
        await UserRepository.save(newUser);
    }
    console.log("Precarga de usuarios y credenciales realizada con éxito");
};


const preloadAppointments: IAppointment[] = [{
    date: new Date("2024-08-08"),
    time: "10:00-11:00",
    userId: 1,
    status: "active"
},
{
    date: new Date("2024-09-09"),
    time: "12:00-13:00",
    userId: 1,
    status: "active"   
}];

export const preloadAppointmentsData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    const appointments = await AppointmentRepository.find();
    if (appointments.length) {
        console.log("No se hizo la precarga de datos porque ya hay turnos");
        await queryRunner.release();
        return;
    }

    const promises = preloadAppointments.map(async (appointment) => {
        const newAppointment = await AppointmentRepository.create(appointment);
        await queryRunner.manager.save(newAppointment);

        const user = await UserRepository.findOneBy({ id: appointment.userId });
        if (!user) throw Error("Usuario inexistente");

        newAppointment.user = user;
        await queryRunner.manager.save(newAppointment);
    });

    try {
        await queryRunner.startTransaction();
        await Promise.all(promises);
        console.log("Precarga de turnos realizada con éxito");
        await queryRunner.commitTransaction();
    } catch (error) {
        console.log("Error al intentar crear los turnos");
        await queryRunner.rollbackTransaction();
    } finally {
        console.log("Ha finalizado el intento de precarga");
        await queryRunner.release();
    }
};

