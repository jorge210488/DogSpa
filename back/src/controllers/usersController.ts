import { Request, Response } from "express";
import { getUserService, getUsersService, createUserService, deleteUserService } from "../services/usersService";
import IUser from "../interfaces/IUser";


export const getUsers = async (req: Request, res: Response) => {
    const users: IUser[] = await getUsersService();
    res.status(200).json(users);
};  

export const getUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.id); // Convierte id a un número
    const user = await getUserService(userId); // Llama al servicio con el id convertido
        res.status(200).json(user); // Si el usuario es encontrado, lo retorna
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, birthdate, nDni, credentialsId } = req.body;
    const newUser: IUser = await createUserService({ name, email, birthdate, nDni, credentialsId });
    res.status(201).json(newUser);
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body;
    await deleteUserService(id);
    res.status(200).json({ message: "Eliminado correctamente" });
};

export const loginUser = async (req: Request, res: Response) => {
    res.send("Login del usuario a la aplicación");
};




// export const deleteUser = async (req: Request, res:Response) => {
//     const {id} = req.body
//     await deleteUserService(id)
//     res.status(200).json({ message:"Eliminado correctamente"});
// };
