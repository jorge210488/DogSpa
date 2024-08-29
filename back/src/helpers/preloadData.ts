import { AppDataSource } from "../config/data-source";
import IAppointment from "../interfaces/IAppointment";
import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser";
import UserRepository from "../repositories/UserRepository";
import AppointmentRepository from "../repositories/AppointmentRepository";
import CredentialRepository from "../repositories/CredentialRespository";
import { TimeRange } from "./enumTime";
import { AppointmentStatus } from "./enumStatus";

const preloadUsers = [{
    user: {
        name: "Jorge M",
        email: "jorge@email.com",
        birthdate: "12/05/1995",
        nDni: 90556545,
    } as IUser, 
    credential: {
        username: "jorge95",
        password: "123456"
    } as ICredential  
},
{
    user: {
        name: "Ana P",
        email: "ana@email.com",
        birthdate: "08/10/1992",
        nDni: 12345678,
    } as IUser, 
    credential: {
        username: "anap92",
        password: "abcd1234"
    } as ICredential  
}];


export const preloadUsersAndCredentials = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const users = await UserRepository.find();
    if (users.length) {
        console.log("No se hizo la precarga de datos porque ya hay usuarios");
        await queryRunner.release();
        return;
    }

    try {
        await queryRunner.startTransaction();

        for (const data of preloadUsers) {
            const newCredential = await queryRunner.manager.create(CredentialRepository.target, data.credential);
            await queryRunner.manager.save(newCredential);

            const newUser = await queryRunner.manager.create(UserRepository.target, { 
                ...data.user, 
                credentials: newCredential
            });
            await queryRunner.manager.save(newUser);
        }

        console.log("Precarga de usuarios y credenciales realizada con éxito");
        await queryRunner.commitTransaction();
    } catch (error) {
        console.log("Error al intentar precargar usuarios y credenciales");
        await queryRunner.rollbackTransaction();
    } finally {
        console.log("Ha finalizado el intento de precarga de usuarios y credenciales");
        await queryRunner.release();
    }
};

const preloadAppointments: IAppointment[] = [{
    date: new Date("2024-08-08"),
    time: TimeRange.ELEVEN_TO_THIRTEEN,
    userId: 1,
    status: AppointmentStatus.ACTIVE
},
{
    date: new Date("2024-09-09"),
    time: TimeRange.FIFTEEN_TO_SIXTEEN,
    userId: 1,
    status: AppointmentStatus.ACTIVE   
},
{
    date: new Date("2024-08-15"),
    time: TimeRange.FOURTEEN_TO_FIFTEEN,
    userId: 2,
    status: AppointmentStatus.ACTIVE
},
{
    date: new Date("2024-09-09"),
    time: TimeRange.TEN_TO_ELEVEN,
    userId: 2,
    status: AppointmentStatus.CANCELLED 
}
];

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
        console.log("Ha finalizado el intento de precarga de turnos");
        await queryRunner.release();
    }
};

