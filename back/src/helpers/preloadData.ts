import { AppDataSource, AppointmentModel, CredentialModel, UserModel } from "../config/data-source";
import IAppointment from "../interfaces/IAppointment";
import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser";

const preloadUsers: IUser[] = [{
    name: "Jorge M",
    email: "prueba@email.com",
    birthdate: "12/05/1995",
    nDni: 90556545,
    credentialsId: 1, 
}];

const preloadCredentials: ICredential[] = [{
    username: "jorge95",
    password: "1234"
}];

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

export const preloadUserData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const users = await UserModel.find();
        if (users.length) return console.log("No se hizo la precarga de datos porque ya hay usuarios");
        for await (const user of preloadUsers) {
            const newUser = await UserModel.create(user);
            await transactionalEntityManager.save(newUser);
        }
        console.log("Precarga de Usuarios realizada con éxito");
    });
};

export const preloadAppointmentsData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    const appointments = await AppointmentModel.find();
    if (appointments.length) {
        console.log("No se hizo la precarga de datos porque ya hay turnos");
        await queryRunner.release();
        return;
    }

    const promises = preloadAppointments.map(async (appointment) => {
        const newAppointment = await AppointmentModel.create(appointment);
        await queryRunner.manager.save(newAppointment);

        const user = await UserModel.findOneBy({ id: appointment.userId });
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

