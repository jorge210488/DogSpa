"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointment = void 0;
const enumTime_1 = require("../helpers/enumTime"); // Asegúrate de importar el enum desde la ubicación correcta
// Función para validar que el rango de tiempo esté dentro de los valores permitidos en el enum
function isValidTimeRange(time) {
    return Object.values(enumTime_1.TimeRange).includes(time);
}
// Función para validar que el día sea de lunes a sábado
function isValidDay(date) {
    const parsedDate = new Date(Date.parse(date));
    const dayOfWeek = parsedDate.getUTCDay();
    return dayOfWeek >= 1 && dayOfWeek <= 6;
}
const validateAppointment = (req, res, next) => {
    const { date, time } = req.body;
    // Validar que el time esté dentro de los valores permitidos
    if (!isValidTimeRange(time)) {
        return res.status(400).json({ message: "El horario debe estar dentro de los rangos permitidos y no debe exceder las 2 horas." });
    }
    // Validar que el día esté entre lunes y sábado
    if (!isValidDay(date)) {
        return res.status(400).json({ message: "Los turnos solo pueden agendarse de lunes a sábado." });
    }
    next();
};
exports.validateAppointment = validateAppointment;
