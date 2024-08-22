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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointment = exports.getAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield (0, appointmentsService_1.getAppointmentsService)();
    res.status(200).json(appointments);
});
exports.getAppointments = getAppointments;
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params.id);
    const appointment = yield (0, appointmentsService_1.getAppointmentService)(appointmentId);
    res.status(200).json(appointment);
});
exports.getAppointment = getAppointment;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId, status } = req.body;
    const newAppointment = yield (0, appointmentsService_1.scheduleAppointmentService)({ date, time, userId, status });
    res.status(201).json(newAppointment);
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.body.id);
    yield (0, appointmentsService_1.cancelAppointmentService)(appointmentId);
    res.status(200).json({ message: "El turno ha sido cancelado exitosamente" });
});
exports.cancelAppointment = cancelAppointment;
// tareaRouter.put("/:id", (req: Request<{ id: string }>, res: Response): void => {
//     const tareaId = Number(req.params.id);
//     const { actividad, prioridad } = req.body;
//     if (!actividad && !prioridad) {
//         res.status(400).json({ message: "Faltan datos" });
//         return;
//     }
// });
