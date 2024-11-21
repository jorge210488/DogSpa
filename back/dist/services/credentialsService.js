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
exports.validateCredential = exports.createCredential = void 0;
const CredentialRespository_1 = __importDefault(require("../repositories/CredentialRespository"));
const createCredential = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = yield CredentialRespository_1.default.create(credentialData);
        yield CredentialRespository_1.default.save(credential);
        return credential;
    }
    catch (error) {
        throw new Error(`Error al crear las credenciales: ${error.message}`);
    }
});
exports.createCredential = createCredential;
const validateCredential = (validateData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = validateData;
    const foundCredential = yield CredentialRespository_1.default.findOne({ where: { username } });
    if (!foundCredential || foundCredential.password !== String(password)) {
        return null; // Para luego validar en el controlador credenciales incorrectas
    }
    return foundCredential.id;
});
exports.validateCredential = validateCredential;
