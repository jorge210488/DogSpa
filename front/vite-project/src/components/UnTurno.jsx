import React from 'react';
import styles from "../styles/UnTurno.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserAppointments } from '../redux/reducer';
import Swal from 'sweetalert2';

const Appointment = ({ id, date, userId, time, status, isHeader }) => {
    const dispatch = useDispatch();
    const userAppointments = useSelector((state) => state.user.userAppointments);

    const handleCancel = async () => {
        const confirmCancel = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No es posible reagendar después de cancelado.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver',
        });
    
        if (!confirmCancel.isConfirmed) return; // Si el usuario cancela, no se hace nada
    
        // Aquí puedes ejecutar la lógica de cancelación si el usuario confirma
        // console.log('Cita cancelada');


        try {
            const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);

            if (response.status === 200) {
                const updatedAppointments = userAppointments.map(appointment =>
                    appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
                );

                dispatch(setUserAppointments(updatedAppointments)); // Actualizamos el store con el turno actualizado
            
             await Swal.fire({
                title: 'Cancelación Exitosa',
                text: 'El turno ha sido cancelado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            
            } else {
                console.error('Error al cancelar el turno:', response.statusText);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al cancelar el turno. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error('Error al cancelar el turno:', error);
            // alert('Hubo un problema al cancelar el turno. Por favor, inténtalo nuevamente.');
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al cancelar el turno. Por favor, inténtalo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
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
