"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoute_1 = __importDefault(require("./usersRoute"));
const appointmentsRoute_1 = __importDefault(require("./appointmentsRoute"));
const contactRoute_1 = __importDefault(require("./contactRoute"));
const router = (0, express_1.Router)();
router.use("/users", usersRoute_1.default);
router.use("/appointments", appointmentsRoute_1.default);
router.use("/contact", contactRoute_1.default);
exports.default = router;
