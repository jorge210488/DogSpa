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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointment = exports.getAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const mailService_1 = require("../services/mailService");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const getAppointments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentsService_1.getAppointmentsService)();
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No se encontraron turnos." });
        }
        res.status(200).json(appointments);
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointments = getAppointments;
const getAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = Number(req.params.id);
        const appointment = yield (0, appointmentsService_1.getAppointmentService)(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
        res.status(200).json(appointment);
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointment = getAppointment;
const scheduleAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userId } = req.body;
        if (!date || !time || !userId) {
            return res.status(400).json({ message: "Datos incorrectos" });
        }
        const newAppointment = yield (0, appointmentsService_1.scheduleAppointmentService)({ date, time, userId });
        const appointment = yield AppointmentRepository_1.default.findOne({
            where: { id: newAppointment.id },
            relations: ['user'],
        });
        if (!appointment || !appointment.user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        yield mailService_1.mailService.sendMail(appointment.user.email, 'DogSpa Cita Programada', `Hola ${appointment.user.name},\n\nTu cita para el ${date} a las ${time} ha sido programada exitosamente. Puedes estar tranquilo/a que tu perrito/a tendrá el mejor cuidado y atención. ¡Esperamos verte pronto!`);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        if (error.statusCode === 400 || error.message === "Invalid ID") {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = Number(req.params.id);
        const appointment = yield AppointmentRepository_1.default.findOne({
            where: { id: appointmentId },
            relations: ['user'],
        });
        if (!appointment) {
            return res.status(404).json({ message: "El turno no existe." });
        }
        yield (0, appointmentsService_1.cancelAppointmentService)(appointment);
        // Enviar correo de notificación al usuario
        const userEmail = appointment.user.email;
        const userName = appointment.user.name;
        const appointmentDate = appointment.date;
        const appointmentTime = appointment.time;
        yield mailService_1.mailService.sendMail(userEmail, 'DogSpa Cita Cancelada', `Hola ${userName},\n\nLamentamos informarte que tu cita para el ${appointmentDate} a las ${appointmentTime} ha sido cancelada.`);
        res.status(200).json({ message: "El turno ha sido cancelado exitosamente" });
    }
    catch (error) {
        console.error('Error in cancelAppointment:', error);
        next(error);
    }
});
exports.cancelAppointment = cancelAppointment;
