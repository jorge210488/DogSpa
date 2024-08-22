import { Router } from "express";
import {getUsers, getUser, createUser, loginUser, deleteUser} from "../controllers/usersController";
import { validateCredential } from "../middlewares/validateCredential";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/register", createUser);

router.delete("/", deleteUser);

router.post("/login", loginUser);

export default router;
