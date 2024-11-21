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
exports.updateUserProfileImageService = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const updateUserProfileImageService = (userId, imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        console.log("Subiendo imagen a Cloudinary, path de la imagen:", imagePath);
        const result = yield cloudinaryConfig_1.default.uploader.upload(imagePath, {
            folder: 'profile_images', // Carpeta donde se almacenarán las imágenes 
            public_id: `user_${userId}`, // Asignamos el ID único del usuario
            overwrite: true, // Sobrescribe la imagen si ya hay una
        });
        console.log("Imagen subida exitosamente, URL:", result.secure_url);
        user.profileImage = result.secure_url;
        yield UserRepository_1.default.save(user);
        return user;
    }
    catch (error) {
        throw new Error(`Error al actualizar la imagen de perfil: ${error.message}`);
    }
});
exports.updateUserProfileImageService = updateUserProfileImageService;
