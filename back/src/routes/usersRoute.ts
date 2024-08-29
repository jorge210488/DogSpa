import { Router } from "express";
import {getUsers, getUser, createUser, loginUser, deleteUser} from "../controllers/usersController";
import { validateCredential } from "../middlewares/validateCredential";
import { loginValidate } from "../middlewares/loginValidate";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/register", validateCredential, createUser);

router.delete("/", deleteUser);

router.post("/login", loginValidate, loginUser);

export default router;
