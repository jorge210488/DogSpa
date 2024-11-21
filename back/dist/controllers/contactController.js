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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const mailService_1 = require("../services/mailService");
const contactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, comment } = req.body;
    if (!name || !email || !comment) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    try {
        yield mailService_1.mailService.sendMail('jorgemartinez.jam@gmail.com', `Repositorio DogSpa - Nuevo mensaje de ${name}`, comment, `<p>${comment}</p><p>Email contacto: ${email}</p>` // HTML opcional
        );
        res.status(200).json({ message: "Correo enviado exitosamente" });
    }
    catch (error) {
        console.error("Error enviando el correo:", error);
        next(error);
    }
});
exports.contactController = contactController;
