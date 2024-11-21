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
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentService = exports.getAppointmentsService = void 0;
const enumStatus_1 = require("../helpers/enumStatus");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield AppointmentRepository_1.default.find({
            relations: {
                user: true
            }
        });
        return appointments;
    }
    catch (error) {
        throw error;
    }
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield AppointmentRepository_1.default.findOneBy({ id });
        return appointment;
    }
    catch (error) {
        throw error;
    }
});
exports.getAppointmentService = getAppointmentService;
const scheduleAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.findById(appointment.userId);
        const newAppointment = yield AppointmentRepository_1.default.create(appointment);
        yield AppointmentRepository_1.default.save(newAppointment);
        newAppointment.user = user;
        AppointmentRepository_1.default.save(newAppointment);
        return newAppointment;
    }
    catch (error) {
        if (error.message === "Invalid ID") {
            error.statusCode = 400;
        }
        throw error;
    }
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        appointment.status = enumStatus_1.AppointmentStatus.CANCELLED;
        yield AppointmentRepository_1.default.save(appointment);
    }
    catch (error) {
        throw error;
    }
});
exports.cancelAppointmentService = cancelAppointmentService;
