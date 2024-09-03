import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { timeRanges } from "../helpers/timeRanges";
import { validateAppointmentForm } from "../helpers/validateAppointmentForm"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/AppointmentForm.module.css"; 

const AppointmentForm = ({ onSubmit }) => {
    const [newAppointment, setNewAppointment] = useState({
        date: "",
        duration: ""
    });
    const [errors, setErrors] = useState({}); 
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({ ...newAppointment, [name]: value });

        // Validar en tiempo real solo el campo que se está completando
        const fieldErrors = validateAppointmentForm({ [name]: value });
        setErrors({ ...errors, [name]: fieldErrors[name] });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateAppointmentForm(newAppointment);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); 
        } else {
            const confirmation = window.confirm(
                `Fecha: ${newAppointment.date}\nDuración: ${newAppointment.duration}\n\n¿Está seguro que desea agendar este turno? No se aceptan reprogramaciones una vez agendado.`
            );

            if (confirmation) {
                onSubmit(newAppointment);
                setNewAppointment({ date: "", duration: "" });
                setShowForm(false);
                setErrors({}); 
            }
        }
    };

    return (
        <>
            <div className={styles.formHeader}>
                <span className={styles.formTitle}>
                    <FontAwesomeIcon icon={faDog} className={styles.icon} /> ¡Quiero un turno!
                </span>
                <Button className="btn btn-lg btn-warning rounded-circle text-white font-weight-bold shadow" onClick={handleToggleForm}>+</Button>
            </div>

            {showForm && (
                <Form onSubmit={handleFormSubmit} className={`mb-4 ${styles.formContainer}`}>
                    <Form.Group controlId="formDate" className={styles.formGroup}>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="date" 
                            value={newAppointment.date} 
                            onChange={handleInputChange} 
                            isInvalid={!!errors.date} 
                            required 
                        />
                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDuration" className={styles.formGroup}>
                        <Form.Label>Duración</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="duration" 
                            value={newAppointment.duration} 
                            onChange={handleInputChange} 
                            isInvalid={!!errors.duration} 
                            required
                        >
                            <option value="" disabled>Duración de 1 Hora o 2 Horas</option>
                            {timeRanges.map((range) => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                    </Form.Group>
                    <div className={styles.buttonContainer}>
                        <Button variant="primary" type="submit" className={styles.submitButton}>Agendar Turno</Button>
                    </div>
                </Form>
            )}
        </>
    );
};

export default AppointmentForm;
