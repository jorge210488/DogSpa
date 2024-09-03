import cloudinary from "../config/cloudinaryConfig";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export const updateUserProfileImageService = async (userId: number, imagePath: string): Promise<User> => {
    try {
        const user = await UserRepository.findOne({ where: { id: userId } });
        if (!user) { throw new Error("Usuario no encontrado"); }

        console.log("Subiendo imagen a Cloudinary, path de la imagen:", imagePath);

        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'profile_images', // Carpeta donde se almacenarán las imágenes 
            public_id: `user_${userId}`, // Asignamos el ID único del usuario
            overwrite: true, // Sobrescribe la imagen si ya hay una
        });

        console.log("Imagen subida exitosamente, URL:", result.secure_url);

        user.profileImage = result.secure_url;
        await UserRepository.save(user); 

        return user;
    } catch (error: any) {
        throw new Error(`Error al actualizar la imagen de perfil: ${error.message}`);
    }
};
