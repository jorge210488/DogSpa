import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import validateLoginForm from '../helpers/validateLoginForm'; 
import { setUser } from '../redux/reducer'; 
import styles from "../styles/Login.module.css";
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [credentialData, setCredentialData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentialData({
            ...credentialData,
            [name]: value,
        });

        // esta validación es en tiempo real
        const validationErrors = validateLoginForm({
            ...credentialData,
            [name]: value,
        });

        setErrors(validationErrors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        // esta validación es antes de enviar
        const validationErrors = validateLoginForm(credentialData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3000/users/login', credentialData);
            console.log('Login exitoso:', response.data);

            if (response.data && response.data.user) {
                dispatch(setUser(response.data.user)); // Hace el dispatch de la acción setUser con los datos del usuario
                alert("Inicio de sesión exitoso");
                navigate('/home'); // Redirigir al Home
            } else {
                setErrors({ login: 'Login fallido' });
            }
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
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Ej: fulanito123"
                    value={credentialData.username}
                    onChange={handleChange}
                />
                {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={credentialData.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </Button>
            {errors.login && <div className="text-danger">{errors.login}</div>}
        </form>
    );
};

export default Login;
