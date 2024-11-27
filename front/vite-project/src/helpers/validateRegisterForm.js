const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username es requerido";
  } else if (values.username.length > 30) {
    errors.username = "Username no puede tener más de 30 caracteres";
  }

  if (!values.password) {
    errors.password = "Password es requerido";
  } else if (values.password.length < 6) {
    errors.password = "Password debe tener al menos 6 caracteres";
  }

  if (!values.name) {
    errors.name = "Nombre y Apellido es requerido";
  } else if (/[^a-zA-ZÀ-ÿ\s]/.test(values.name)) {
    // Permite letras con acentos y espacios
    errors.name =
      "Nombre y Apellido no puede contener caracteres especiales como !*+_-¡";
  } else if (values.name.length > 100) {
    errors.name = "Nombre y Apellido no puede tener más de 100 caracteres";
  }

  if (!values.email) {
    errors.email = "Email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Dirección de email inválida";
  }

  if (!values.birthdate) {
    errors.birthdate = "Fecha de Nacimiento es requerida";
  } else {
    const birthDate = new Date(values.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const isFutureDate = birthDate > today;

    if (isFutureDate) {
      errors.birthdate = "La fecha de nacimiento no puede estar en el futuro";
    } else if (
      age < 18 ||
      (age === 18 &&
        today < new Date(birthDate.setFullYear(today.getFullYear())))
    ) {
      errors.birthdate = "Debe ser mayor de 18 años";
    }
  }

  if (!values.nDni) {
    errors.nDni = "El número de DNI es requerido";
  } else if (isNaN(values.nDni)) {
    errors.nDni = "El DNI debe ser un número";
  } else if (values.nDni.length > 10) {
    errors.nDni = "El DNI no puede tener más de 10 caracteres";
  }

  return errors;
};

export default validateRegisterForm;
