import { Router } from "express";
import {getAppointments, getAppointment, scheduleAppointment, cancelAppointment} from "../controllers/appointmentsController";
import { validateAppointment } from "../middlewares/appointmentTime";
const router = Router();

router.get("/", getAppointments);

router.get("/:id", getAppointment);

router.post("/schedule", validateAppointment, scheduleAppointment);

router.put("/cancel/:id", cancelAppointment);

export default router;