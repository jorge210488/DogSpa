import { AppointmentStatus } from "../helpers/enumStatus";
import { TimeRange } from "../helpers/enumTime";

interface IAppointment {
    id?: number,
    date: Date,
    time: TimeRange,
    userId: number,
    status: AppointmentStatus
}


export default IAppointment;