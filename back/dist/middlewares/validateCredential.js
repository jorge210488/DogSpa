"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredential = void 0;
const CredentialRespository_1 = __importDefault(require("../repositories/CredentialRespository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const validateCredential = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, nDni } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan las credenciales" });
    }
    const credential = yield CredentialRespository_1.default.findOne({ where: { username } });
    if (credential) {
        return res.status(409).json({ message: "El username ya existe" });
    }
    const existingUserByEmail = yield UserRepository_1.default.findOne({ where: { email } });
    if (existingUserByEmail) {
        return res.status(409).json({ message: "El email ya existe" });
    }
    const existingUserByDni = yield UserRepository_1.default.findOne({ where: { nDni } });
    if (existingUserByDni) {
        return res.status(409).json({ message: "El nDni ya existe" });
    }
    next();
});
exports.validateCredential = validateCredential;
