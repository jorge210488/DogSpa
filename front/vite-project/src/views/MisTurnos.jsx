import React, { useState, useEffect } from "react";
// import myAppointments from "../helpers/myAppointments";
import Appointment from "../components/UnTurno";
import styles from "../styles/MisTurnos.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/appointments")
            .then(res => setAppointments(res.data));
    }, []);
    

    return (
        <>
            <div className={styles.appointmentsContainer}>
                {/* Llamada al componente Appointment para mostrar el encabezado */}
                <Appointment isHeader={true} />

                {/* Tarjetas de turnos */}
                {appointments.map((appointment) => (
                    <Appointment 
                        key={appointment.id}
                        id={appointment.id}
                        date={appointment.date} 
                        time={appointment.time} 
                        status={appointment.status} 
                        userId={appointment.userId}
                    />
                ))}
            </div>
        </>
    );
}

export default Appointments;
