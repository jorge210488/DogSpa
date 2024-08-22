"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredential = void 0;
const credentialsService_1 = require("../services/credentialsService");
const validateCredential = (req, res, next) => {
    const { username, password } = req.headers;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan las credenciales" });
    }
    const credential = credentialsService_1.credentials.find((cred) => cred.username === username);
    // Verificar si las credenciales coinciden
    if (credential && credential.password === password) {
        next();
    }
    else {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }
};
exports.validateCredential = validateCredential;
