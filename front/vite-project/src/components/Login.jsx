import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import validateLoginForm from '../helpers/validateLoginForm'; 
import { setUser } from '../redux/reducer'; 
import styles from "../styles/Login.module.css";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const Login = ({ onLoginSuccess }) => {
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

        // Validación en tiempo real
        const validationErrors = validateLoginForm({
            ...credentialData,
            [name]: value,
        });

        setErrors(validationErrors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        // Validación antes de enviar
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
                dispatch(setUser(response.data.user)); // Actualiza el estado global
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido a DogSpa!',
                    timer: 4000, // 4 segundos
                    showConfirmButton: false,
                });
                onLoginSuccess(); // Cierra el modal
                navigate('/home'); // Redirige al Home
            } else {
                setErrors({ login: 'Login fallido' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Login Fallido',
                text: 'Credenciales incorrectas. Por favor, inténtalo nuevamente.',
            });
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
                    id="username"
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
                    id="password"
                    className="form-control"
                    value={credentialData.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <Button variant="primary" type="submit" className="formButton" disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </Button>

            {errors.login && <div className="text-danger">{errors.login}</div>}
        </form>
    );
};

export default Login;
