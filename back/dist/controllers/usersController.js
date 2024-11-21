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
exports.updateUserProfileImage = exports.createUser = exports.loginUser = exports.deleteUser = exports.getUser = exports.getUsers = void 0;
const usersService_1 = require("../services/usersService");
const updateUserProfileImageService_1 = require("../services/updateUserProfileImageService");
const credentialsService_1 = require("../services/credentialsService");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const mailService_1 = require("../services/mailService");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUserService)(Number(id));
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID del usuario" });
        }
        yield (0, usersService_1.deleteUserService)(id);
        res.status(200).json({ message: "Eliminado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const credentialId = yield (0, credentialsService_1.validateCredential)({ username, password });
        if (!credentialId) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }
        const user = yield UserRepository_1.default.findOne({
            where: { credentials: { id: credentialId } },
            relations: ["credentials"],
        });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({
            login: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,
                profileImage: user.profileImage, // Incluimos la imagen de perfil 
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, name, email, birthdate, nDni } = req.body;
        if (!username || !password || !name || !email || !birthdate || !nDni) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }
        const credential = yield (0, credentialsService_1.createCredential)({ username, password });
        const newUser = yield (0, usersService_1.createUserService)({ name, email, birthdate, nDni, credentialsId: credential.id, });
        newUser.credentials = credential;
        yield UserRepository_1.default.save(newUser);
        yield mailService_1.mailService.sendMail(email, 'Bienvenido a DogSpa', `Hola ${name},\n\nGracias por registrarte en DogSpa, estamos contentos de tenerte aquí, espero podamos darle un día de relajación y disfrute a tu perrito!.`);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUserProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = Number(req.params.id);
        const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Extrae la ruta temporal de la imagen que ha sido cargada en el servidor a través del middleware multer. req.file?.path accede a la ruta de la imagen almacenada temporalmente
        if (!imagePath) {
            return res.status(400).json({ message: "No se ha proporcionado ninguna imagen." });
        }
        const updatedUser = yield (0, updateUserProfileImageService_1.updateUserProfileImageService)(userId, imagePath);
        res.status(200).json({ message: "Imagen de perfil actualizada exitosamente", user: updatedUser });
    }
    catch (error) {
        console.error("Error en updateUserProfileImage:", error.message);
        next(error);
    }
});
exports.updateUserProfileImage = updateUserProfileImage;
