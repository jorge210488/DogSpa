"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadAppointmentsData = exports.preloadUsersAndCredentials = void 0;
const data_source_1 = require("../config/data-source");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const CredentialRespository_1 = __importDefault(require("../repositories/CredentialRespository"));
const enumTime_1 = require("./enumTime");
const enumStatus_1 = require("./enumStatus");
const preloadUsers = [{
        user: {
            name: "Jorge M",
            email: "jorge@email.com",
            birthdate: "12/05/1995",
            nDni: 90556545,
        },
        credential: {
            username: "jorge95",
            password: "123456"
        }
    },
    {
        user: {
            name: "Ana P",
            email: "ana@email.com",
            birthdate: "08/10/1992",
            nDni: 12345678,
        },
        credential: {
            username: "anap92",
            password: "abcd1234"
        }
    }];
const preloadUsersAndCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const users = yield UserRepository_1.default.find();
    if (users.length) {
        console.log("No se hizo la precarga de datos porque ya hay usuarios");
        yield queryRunner.release();
        return;
    }
    try {
        yield queryRunner.startTransaction();
        for (const data of preloadUsers) {
            const newCredential = yield queryRunner.manager.create(CredentialRespository_1.default.target, data.credential);
            yield queryRunner.manager.save(newCredential);
            const newUser = yield queryRunner.manager.create(UserRepository_1.default.target, Object.assign(Object.assign({}, data.user), { credentials: newCredential }));
            yield queryRunner.manager.save(newUser);
        }
        console.log("Precarga de usuarios y credenciales realizada con éxito");
        yield queryRunner.commitTransaction();
    }
    catch (error) {
        console.log("Error al intentar precargar usuarios y credenciales");
        yield queryRunner.rollbackTransaction();
    }
    finally {
        console.log("Ha finalizado el intento de precarga de usuarios y credenciales");
        yield queryRunner.release();
    }
});
exports.preloadUsersAndCredentials = preloadUsersAndCredentials;
const preloadAppointments = [{
        date: new Date("2024-08-08"),
        time: enumTime_1.TimeRange.ELEVEN_TO_THIRTEEN,
        userId: 1,
        status: enumStatus_1.AppointmentStatus.ACTIVE
    },
    {
        date: new Date("2024-09-09"),
        time: enumTime_1.TimeRange.FIFTEEN_TO_SIXTEEN,
        userId: 1,
        status: enumStatus_1.AppointmentStatus.ACTIVE
    },
    {
        date: new Date("2024-08-15"),
        time: enumTime_1.TimeRange.FOURTEEN_TO_FIFTEEN,
        userId: 2,
        status: enumStatus_1.AppointmentStatus.ACTIVE
    },
    {
        date: new Date("2024-09-09"),
        time: enumTime_1.TimeRange.TEN_TO_ELEVEN,
        userId: 2,
        status: enumStatus_1.AppointmentStatus.CANCELLED
    }
];
const preloadAppointmentsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const appointments = yield AppointmentRepository_1.default.find();
    if (appointments.length) {
        console.log("No se hizo la precarga de datos porque ya hay turnos");
        yield queryRunner.release();
        return;
    }
    const promises = preloadAppointments.map((appointment) => __awaiter(void 0, void 0, void 0, function* () {
        const newAppointment = yield AppointmentRepository_1.default.create(appointment);
        yield queryRunner.manager.save(newAppointment);
        const user = yield UserRepository_1.default.findOneBy({ id: appointment.userId });
        if (!user)
            throw Error("Usuario inexistente");
        newAppointment.user = user;
        yield queryRunner.manager.save(newAppointment);
    }));
    try {
        yield queryRunner.startTransaction();
        yield Promise.all(promises);
        console.log("Precarga de turnos realizada con éxito");
        yield queryRunner.commitTransaction();
    }
    catch (error) {
        console.log("Error al intentar crear los turnos");
        yield queryRunner.rollbackTransaction();
    }
    finally {
        console.log("Ha finalizado el intento de precarga de turnos");
        yield queryRunner.release();
    }
});
exports.preloadAppointmentsData = preloadAppointmentsData;
