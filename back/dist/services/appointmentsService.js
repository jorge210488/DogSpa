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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentService = exports.getAppointmentsService = void 0;
let appointments = [];
let id = 1;
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return appointments;
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = appointments.find((appointment) => appointment.id === id);
    return appointment;
});
exports.getAppointmentService = getAppointmentService;
const scheduleAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!appointmentData.userId) {
        throw new Error("El ID del usuario es obligatorio para crear un turno.");
    }
    const newAppointment = {
        id,
        date: appointmentData.date,
        time: appointmentData.time,
        userId: appointmentData.userId,
        status: appointmentData.status || "active",
    };
    appointments.push(newAppointment);
    id++;
    return newAppointment;
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    appointments = appointments.map((appointment) => {
        if (appointment.id === id) {
            // Cambia el estatus del turno a "cancelled"
            return Object.assign(Object.assign({}, appointment), { status: "cancelled" });
        }
        return appointment;
    });
});
exports.cancelAppointmentService = cancelAppointmentService;
