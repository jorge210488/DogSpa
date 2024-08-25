import { Router } from "express";
import {getAppointments, getAppointment, scheduleAppointment, cancelAppointment} from "../controllers/appointmentsController";
const router = Router();

router.get("/", getAppointments);

router.get("/:id", getAppointment);

router.post("/schedule", scheduleAppointment);

router.put("/cancel/:id", cancelAppointment);

export default router;