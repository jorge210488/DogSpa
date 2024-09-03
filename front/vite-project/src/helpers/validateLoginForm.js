const validateLoginForm = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "El Username es requerido";
    } else {
        const usernameRegex = /^[a-zA-Z0-9._-ñÑáéíóúÁÉÍÓÚüÜ]+$/;
        if (!usernameRegex.test(values.username)) {
            errors.username = "El Username solo puede contener letras, números, puntos, guiones y guiones bajos";
        }
    }

    if (!values.password) {
        errors.password = "El Password es requerido";
    } else if (values.password.length < 6) {
        errors.password = "El Password debe tener al menos 6 caracteres";
    }

    return errors;
};

export default validateLoginForm;
