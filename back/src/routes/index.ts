import { Router } from "express";
import usersRoute from "./usersRoute";
import appointmentsRoute from "./appointmentsRoute";

const router: Router = Router();

router.use("/users", usersRoute);
router.use("/appointments", appointmentsRoute);

export default router;



