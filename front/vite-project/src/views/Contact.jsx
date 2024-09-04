import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'; 
import validateContactForm from '../helpers/validateContactForm';

const Contact = () => {
    const [isActive, setIsActive] = useState(false);
    const [buttonText, setButtonText] = useState('Click para contactarme');
    const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
    const [errors, setErrors] = useState({});

    const handleToggle = () => {
        setIsActive(!isActive);
        setButtonText(isActive ? 'Click para contactarme' : 'Cerrar Formulario');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        const newErrors = { ...errors, [name]: validateContactForm({ ...formData, [name]: value })[name] };
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateContactForm(formData);
        setErrors(newErrors);

        if (!newErrors.name && !newErrors.email && !newErrors.comment) {
            try {
                const response = await axios.post('http://localhost:3000/contact', formData);
                if (response.status === 200) {
                    alert('Contacto enviado exitosamente');
                    setFormData({ name: '', email: '', comment: '' });
                    setErrors({}); 
                } else {
                    alert('No se pudo enviar el mensaje de contacto, por favor intente nuevamente');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('No se pudo enviar el mensaje de contacto, por favor intente nuevamente');
            }
        }
    };

    return (
        <div className={styles.contactContainer}>
            <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
                <div className={`${styles.photo} ${isActive ? styles.active : ''}`}></div>
                <div className={`${styles.banner} ${isActive ? styles.active : ''}`}></div>
                <ul className={isActive ? styles.active : ''}>
                    <li><b>Jorge Martínez</b></li>
                    <li>Full Stack Developer</li>
                </ul>
                <button className={styles.contact} id="main-button" onClick={handleToggle}>
                    {buttonText}
                </button>
                <div className={`${styles.socialMediaBanner} ${isActive ? styles.active : ''}`}>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="mailto:jorgemartinez.jam@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                    <a href="https://github.com/jorge210488?tab=repositories"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://www.linkedin.com/in/jorgemartinezgarcia/"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
                <form className={`${styles.emailForm} ${isActive ? styles.active : ''}`} onSubmit={handleSubmit}>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="Nombre completo" 
                        value={formData.name} 
                        onChange={handleChange} 
                        style={{ textTransform: 'capitalize' }} // Aplica capitalización solo para el nombre
                    />
                    {errors.name && (
                        <p className={styles.error}>
                            {errors.name}
                            <FontAwesomeIcon icon={faExclamationCircle} className={styles.errorIcon} />
                        </p>
                    )}
                    <input 
                        name="email" 
                        type="text" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    {errors.email && (
                        <p className={styles.error}>
                            {errors.email}
                            <FontAwesomeIcon icon={faExclamationCircle} className={styles.errorIcon} />
                        </p>
                    )}
                    <textarea 
                        name="comment" 
                        placeholder="Mensaje para el desarrollador" 
                        value={formData.comment} 
                        onChange={handleChange} 
                    />
                    {errors.comment && (
                        <p className={styles.error}>
                            {errors.comment}
                            <FontAwesomeIcon icon={faExclamationCircle} className={styles.errorIcon} />
                        </p>
                    )}
                    <button className={styles.contact} type="submit">send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
