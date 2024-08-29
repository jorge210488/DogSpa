import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import validateRegisterForm from '../helpers/validateRegisterForm';
import axios from 'axios';

const Register = () => {
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        birthdate: "",
        nDni: ""
    });

    const handleSubmit = async (values, actions) => {
        try {
            const response = await axios.post('http://localhost:3000/users/register', values);
            console.log('Registro exitoso:', response.data);
            alert('Usuario registrado exitosamente');
            actions.resetForm(); // Borra el formulario solo si el registro es exitoso
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema al registrar el usuario. Por favor, inténtalo nuevamente.');
        } finally {
            actions.setSubmitting(false); // Habilita el botón de envío después de procesar
        }
    };

    return (
        <Formik
            initialValues={formValues}
            enableReinitialize={true}
            validate={validateRegisterForm}
            onSubmit={handleSubmit} // Pasamos handleSubmit directamente
        >
            {({ isSubmitting }) => (
                <FormikForm>
                    <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <Field type="text" name="username" className="form-control" placeholder="Ej: fulanito123" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = "Ingrese su username"}/>
                        <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" className="form-control"/>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name">Nombre y Apellido</label>
                        <Field type="text" name="name" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" className="form-control"/>
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="birthdate">Fecha de Nacimiento</label>
                        <Field type="date" name="birthdate" className="form-control"/>
                        <ErrorMessage name="birthdate" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nDni">nDni</label>
                        <Field type="text" name="nDni" className="form-control"/>
                        <ErrorMessage name="nDni" component="div" className="text-danger" />
                    </div>
                    
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </Button>
                </FormikForm>
            )}
        </Formik>
    );
}

export default Register;
