import React from "react";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";
import validateRegisterForm from "../helpers/validateRegisterForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        values
      );
      console.log("Registro exitoso:", response.data);

      // Alerta de éxito con SweetAlert2
      await Swal.fire({
        title: "Registro Exitoso",
        text: "Usuario registrado exitosamente. Procede al login.",
        icon: "success",
        confirmButtonText: "Ir al inicio",
      });

      actions.resetForm();
      navigate("/home"); // Redirige a /home después de un registro exitoso
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      // Alerta de error con SweetAlert2
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el usuario. Por favor, inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      actions.setSubmitting(false); // Habilita el botón de envío después de procesar
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerImageContainer}>
        <img
          src="https://res.cloudinary.com/deflfnoba/image/upload/v1725299289/fotosm3/wozrdiks3mt2nibwv1ys.avif"
          alt="Welcome"
          className={styles.registerImage}
        />
      </div>
      <div className={styles.registerFormContainer}>
        <Formik
          initialValues={{
            username: "",
            password: "",
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
          }}
          validate={validateRegisterForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Ej: fulanito123"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Ingrese su username")}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name">Nombre y Apellido</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="birthdate">Fecha de Nacimiento</label>
                <Field type="date" name="birthdate" className="form-control" />
                <ErrorMessage
                  name="birthdate"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nDni">nDni</label>
                <Field type="text" name="nDni" className="form-control" />
                <ErrorMessage
                  name="nDni"
                  component="div"
                  className="text-danger"
                />
              </div>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </Button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
