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
exports.loginUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const usersService_1 = require("../services/usersService");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, usersService_1.getUsersService)();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id); // Convierte id a un número
    const user = yield (0, usersService_1.getUserService)(userId); // Llama al servicio con el id convertido
    res.status(200).json(user); // Si el usuario es encontrado, lo retorna
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, credentialsId } = req.body;
    const newUser = yield (0, usersService_1.createUserService)({ name, email, birthdate, nDni, credentialsId });
    res.status(201).json(newUser);
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield (0, usersService_1.deleteUserService)(id);
    res.status(200).json({ message: "Eliminado correctamente" });
});
exports.deleteUser = deleteUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Login del usuario a la aplicación");
});
exports.loginUser = loginUser;
// export const deleteUser = async (req: Request, res:Response) => {
//     const {id} = req.body
//     await deleteUserService(id)
//     res.status(200).json({ message:"Eliminado correctamente"});
// };
