import React from 'react';
import styles from "../styles/UnTurno.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserAppointments } from '../redux/reducer';

const Appointment = ({ id, date, userId, time, status, isHeader }) => {
    const dispatch = useDispatch();
    const userAppointments = useSelector((state) => state.user.userAppointments);

    const handleCancel = async () => {
        const confirmCancel = window.confirm("¿Estás seguro? No es posible reagendar después de cancelado");
        if (!confirmCancel) return; // Si el usuario cancela no se hace nada

        try {
            const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);

            if (response.status === 200) {
                const updatedAppointments = userAppointments.map(appointment =>
                    appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
                );

                dispatch(setUserAppointments(updatedAppointments)); // Actualizamos el store con el turno actualizado
            } else {
                console.error('Error al cancelar el turno:', response.statusText);
            }
        } catch (error) {
            console.error('Error al cancelar el turno:', error);
            alert('Hubo un problema al cancelar el turno. Por favor, inténtalo nuevamente.');
        }
    };

    if (isHeader) {
        return (
            <div className={`${styles.appointmentCard} col-12 my-2`}>
                <div className="card shadow">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-6 col-md-8">
                                <div className="row align-items-center justify-content-center">
                                    <h5 className={`col-sm-12 col-md-4 ${styles.cardTitle}`}><strong>ID</strong></h5>
                                    <h5 className={`col-sm-12 col-md-4 ${styles.cardTitle} ${styles.textMuted}`}><strong>Fecha</strong></h5>
                                    <h5 className={`col-sm-12 col-md-4 ${styles.textInfo}`}><strong>Duración</strong></h5>
                                </div>
                            </div>
                            <div className="col-3 col-md-2 text-center">
                                <h5 className={styles.cardTitle}><strong>Estado</strong></h5>
                            </div>
                            <div className="col-3 col-md-2 text-center">
                                <h5 className={styles.cardTitle}><strong>Acción</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.appointmentCard} col-12 my-2`}>
            <div className="card shadow">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-6 col-md-8">
                            <div className="row align-items-center justify-content-center">
                                <h5 className={`col-sm-12 col-md-4 ${styles.cardTitle}`}>{id}</h5>
                                <h5 className={`col-sm-12 col-md-4 ${styles.cardTitle} ${styles.textMuted}`}>{date}</h5>
                                <h5 className={`col-sm-12 col-md-4 ${styles.textInfo}`}>{time}</h5>
                            </div>
                        </div>
                        <div className="col-3 col-md-2 text-center">
                            <h5 className="text-center">
                                {status === "active" ? (
                                    <i className="fa fa-check fa-2x text-info"></i>
                                ) : (
                                    <i className="fas fa-times fa-2x text-danger"></i>
                                )}
                            </h5>
                        </div>
                        <div className="col-3 col-md-2 text-center">
                            {status === "active" && (
                                <button className="btn btn-danger btn-sm" onClick={handleCancel}> Cancelar</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
