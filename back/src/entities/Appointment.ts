import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TimeRange } from "../helpers/enumTime";
import { AppointmentStatus } from "../helpers/enumStatus";

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date', nullable: false })
    date: Date;    

    @Column()  
    time: TimeRange

    @ManyToOne(() => User, (user) => user.appointments)
    user: User

    @Column({default: "active"})
    status: AppointmentStatus
}
