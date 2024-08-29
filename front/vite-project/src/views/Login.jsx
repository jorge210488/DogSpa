import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import validateLoginForm from '../helpers/validateLoginForm';

const Login = () => {
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Corregido: usa 'event' en lugar de 'e'
        const validationErrors = validateLoginForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3000/users/login', formValues);
            console.log('Login exitoso:', response.data);
            alert('Usuario inició sesión exitosamente');
            setFormValues({
                username: "",
                password: "",
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Hubo un problema al iniciar sesión. Por favor, inténtalo nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Ej: fulanito123"
                    value={formValues.username}
                    onChange={handleChange}
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = "Ingrese su username"}
                />
                {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formValues.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando Sesión...' : 'Login'}
            </Button>
        </form>
    );
}

export default Login;
