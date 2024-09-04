import { Router } from "express";
import { contactController } from "../controllers/contactController";

const router: Router = Router();

router.post("/", contactController);

export default router;
