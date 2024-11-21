"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
const AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
exports.default = AppointmentRepository;
