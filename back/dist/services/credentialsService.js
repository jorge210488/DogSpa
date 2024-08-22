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
exports.createCredential = exports.credentials = void 0;
exports.credentials = [];
let id = 1;
const createCredential = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = {
        id,
        username: credentialData.username,
        password: credentialData.password
    };
    exports.credentials.push(newCredential);
    id++;
    const credentialsId = newCredential.id;
    return credentialsId; // Retornar el ID de la credencial creada
});
exports.createCredential = createCredential;
