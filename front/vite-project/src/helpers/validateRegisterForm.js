const validateRegisterForm = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username es requerido';
    } else if (values.username.length > 30) {
        errors.username = 'Username no puede tener más de 30 caracteres';
    }

    if (!values.password) {
        errors.password = 'Password es requerido';
    } else if (values.password.length < 6) {
        errors.password = 'Password debe tener al menos 6 caracteres';
    }

    if (!values.name) {
        errors.name = 'Nombre y Apellido es requerido';
    } else if (/[^a-zA-Z0-9\s]/.test(values.name)) {
        errors.name = 'Nombre y Apellido no puede contener caracteres especiales como !*+_-¡';
    } else if (values.name.length > 100) {
        errors.name = 'Nombre y Apellido no puede tener más de 100 caracteres';
    }

    if (!values.email) {
        errors.email = 'Email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Dirección de email invalida';
    }

    if (!values.birthdate) {
        errors.birthdate = 'Fecha de Nacimiento es requerido';
    }

    if (!values.nDni) {
        errors.nDni = 'El número de DNI es requerido';
    } else if (isNaN(values.nDni)) {
        errors.nDni = 'El DNI debe ser un número';
    } else if (values.nDni.length > 20) {
        errors.nDni = 'El DNI no puede tener más de 20 caracteres';
    }

    return errors;
};

export default validateRegisterForm;
