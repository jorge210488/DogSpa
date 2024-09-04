import { Router } from "express";
import usersRoute from "./usersRoute";
import appointmentsRoute from "./appointmentsRoute";
import contactRoute from "./contactRoute";

const router: Router = Router();

router.use("/users", usersRoute);
router.use("/appointments", appointmentsRoute);
router.use("/contact", contactRoute);

export default router;



