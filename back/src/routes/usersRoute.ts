import { Router } from "express";
import multer from "multer";
import {
  getUsers,
  getUser,
  createUser,
  loginUser,
  deleteUser,
  updateUserProfileImage,
  updateUser,
} from "../controllers/usersController";
import { validateCredential } from "../middlewares/validateCredential";
import { loginValidate } from "../middlewares/loginValidate";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/register", validateCredential, createUser);

router.delete("/", deleteUser);

router.post("/login", loginValidate, loginUser);

router.put(
  "/:id/profile-image",
  upload.single("image"),
  updateUserProfileImage
);

router.put("/:id", updateUser);

export default router;
