import { timeRanges } from "./timeRanges";

export const validateAppointmentForm = (values) => {
    const errors = {};

    // Validar que la fecha esté en el formato dd-mm-yyyy
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(values.date)) {
        errors.date = "La fecha debe tener el formato dd-mm-yyyy";
        return errors;
    }

    // Validar que la fecha sea de mañana en adelante
    const selectedDate = new Date(values.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate <= today) {
        errors.date = "La fecha seleccionada debe ser de mañana en adelante.";
    }

    const dayOfWeek = selectedDate.getUTCDay(); // Devuelve 0 para domingo, 1 para lunes, etc.
    if (dayOfWeek === 0) {
        errors.date = "No se pueden agendar turnos en domingo.";
    }

    if (!timeRanges.includes(values.duration)) {
        errors.duration = "La duración seleccionada no es válida.";
    }

    return errors;
};
