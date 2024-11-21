"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const usersController_1 = require("../controllers/usersController");
const validateCredential_1 = require("../middlewares/validateCredential");
const loginValidate_1 = require("../middlewares/loginValidate");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.get("/", usersController_1.getUsers);
router.get("/:id", usersController_1.getUser);
router.post("/register", validateCredential_1.validateCredential, usersController_1.createUser);
router.delete("/", usersController_1.deleteUser);
router.post("/login", loginValidate_1.loginValidate, usersController_1.loginUser);
router.put("/:id/profile-image", upload.single("image"), usersController_1.updateUserProfileImage);
exports.default = router;
