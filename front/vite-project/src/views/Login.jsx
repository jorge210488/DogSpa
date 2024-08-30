import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import validateLoginForm from '../helpers/validateLoginForm';
import styles from "../styles/Login.module.css"

const Login = () => {
    const [credentialData, setCredentialData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentialData({
            ...credentialData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // 
        const validationErrors = validateLoginForm(credentialData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3000/users/login', credentialData);
            console.log('Login exitoso:', response.data);
            alert("Inicio de sesión exitoso");
            setCredentialData({
                username: "",
                password: "",
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas. Por favor, inténtalo nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" className="form-control" placeholder="Ej: fulanito123" value={credentialData.username} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = "Ingrese su username"}/>
                {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" value={credentialData.password} onChange={handleChange}/>
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </Button>
        </form>
    );
}

export default Login;
