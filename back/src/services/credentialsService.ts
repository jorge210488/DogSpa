import credentialDto from "../dto/credentialDto";
import ICredential from "../interfaces/ICredential";


export let credentials: ICredential[] = [];
let id: number = 1;

export const createCredential = async (credentialData: credentialDto): Promise<number> => {
    const newCredential: ICredential = {
        id, 
        username: credentialData.username,
        password: credentialData.password
    };

    credentials.push(newCredential);  
    id++;
    const credentialsId = newCredential.id;
    return credentialsId; // Retornar el ID de la credencial creada
};


