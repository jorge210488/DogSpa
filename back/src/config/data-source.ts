import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3001,
    username: "postgres",
    password: "18034783",
    database: "dogspa",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})

