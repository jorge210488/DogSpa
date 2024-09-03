import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from "./envs";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT), 
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
});
