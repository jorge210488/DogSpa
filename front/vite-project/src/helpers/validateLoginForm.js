const validateLoginForm = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "Username es requerido";
    }

    if (!values.password) {
        errors.password = "Password es requerido";
    }

    return errors;
};

export default validateLoginForm;
