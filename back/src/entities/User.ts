import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length: 100
    })
    name: string;

    @Column()
    email: string;

    @Column()
    birthdate: string;

    @Column("integer")
    nDni: number;

    @OneToOne(() => Credential)
    @JoinColumn({ name: 'credentialsId' })  // Especifica la columna 'credentialsId' como la clave foránea
    credentials: Credential;

    @OneToMany(() => Appointment, (appointment => appointment.user))
    appointments: Appointment[];

    @Column({ nullable: true })
    profileImage?: string; // Nueva columna para almacenar la URL de la imagen de perfil
}
