interface IAppointment {
    id: number,
    date: Date,
    time: {
        start: string,   // Ejemplo: "14:30"
        duration: number // Ejemplo: 30 (minutos)
    },
    userId: number,
    status: string
}


export default IAppointment;