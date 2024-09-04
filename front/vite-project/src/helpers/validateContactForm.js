const validateContactForm = (formData) => {
    const errors = {};

    // Validar nombre
    const nameRegex = /^[a-zA-ZÀ-ÿ\sñÑ]{1,50}$/;
    if (!formData.name) {
        errors.name = "El nombre es requerido";
    } else if (!nameRegex.test(formData.name)) {
        errors.name = "El nombre no debe tener más de 50 caracteres y no puede contener caracteres especiales";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
        errors.email = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formData.email)) {
        errors.email = "El correo electrónico no es válido";
    }

    // Validar comentario
    if (!formData.comment) {
        errors.comment = "El comentario es requerido";
    } else if (formData.comment.length > 300) {
        errors.comment = "El comentario no debe tener más de 300 caracteres";
    }

    return errors;
};

export default validateContactForm;
