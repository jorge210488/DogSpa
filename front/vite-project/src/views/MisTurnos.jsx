import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Appointment from "../components/UnTurno";
import AppointmentForm from "../components/AppointmentForm";
import styles from "../styles/MisTurnos.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { setUserAppointments, clearUserAppointments } from "../redux/reducer";

const Appointments = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const userAppointments = useSelector((state) => state.user.userAppointments);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${user.id}`);
            dispatch(setUserAppointments(response.data.appointments));
        } catch (error) {
            console.error("Error al cargar las citas:", error);
            dispatch(clearUserAppointments());
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        fetchAppointments();
    }, [user, navigate, dispatch]);

    const handleNewAppointment = async (appointmentData) => {
        try {
            await axios.post('http://localhost:3000/appointments/schedule', {
                date: appointmentData.date,
                time: appointmentData.duration, 
                userId: user.id
            });
            alert("El turno fue agendado exitosamente");
            fetchAppointments(); // Recargarmos las citas nuevamente
        } catch (error) {
            console.error("Error al agendar el turno:", error);
            alert("El Turno no pudo ser agendado, por favor intente nuevamente.");
        }
    };

    //Para organizar las citas por fecha y por duración 
    const sortedAppointments = [...userAppointments].sort((a, b) => {
        const startA = Date.parse(`${a.date}T${a.time.split('-')[0]}`);
        const startB = Date.parse(`${b.date}T${b.time.split('-')[0]}`);
        return startA - startB;
    });

    return (
        <>
            <AppointmentForm onSubmit={handleNewAppointment} />

            <div className={styles.appointmentsContainer}>
                <Appointment isHeader={true} />
                {sortedAppointments.length > 0 ? (
                    sortedAppointments.map((appointment) => (
                        <Appointment 
                            key={appointment.id}
                            id={appointment.id}
                            date={appointment.date} 
                            time={appointment.time} 
                            status={appointment.status} 
                            userId={user.id}
                        />
                    ))
                ) : (
                    <div className={styles.noAppointments}>
                        <p>No hay turnos agendados para este usuario.</p>
                        <img src="https://res.cloudinary.com/deflfnoba/image/upload/v1725244480/fotosm3/rpafabi9j73jpookmwyk.webp" alt="No Appointments" />
                    </div>
                )}
            </div>
        </>
    );
}

export default Appointments;
