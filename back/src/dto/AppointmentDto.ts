import { AppointmentStatus } from "../helpers/enumStatus";
import { TimeRange } from "../helpers/enumTime"

interface AppointmentDto {
    date: Date,
    time: TimeRange,
    userId: number,
    status?: AppointmentStatus
}

export default AppointmentDto;

