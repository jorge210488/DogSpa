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
exports.deleteUserService = exports.createUserService = exports.getUsersService = exports.getUserService = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.findOne({
            where: { id },
            relations: ["appointments"]
        });
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario con ID ${id}: ${error.message}`);
    }
});
exports.getUserService = getUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserRepository_1.default.find({
            relations: {
                credentials: true
            }
        });
        return users;
    }
    catch (error) {
        throw new Error(`Error al obtener los usuarios: ${error.message}`);
    }
});
exports.getUsersService = getUsersService;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.create(userData);
        yield UserRepository_1.default.save(user);
        return user;
    }
    catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
});
exports.createUserService = createUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.findOne({ where: { id } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        yield UserRepository_1.default.remove(user);
    }
    catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
});
exports.deleteUserService = deleteUserService;
