import credentialDto from "../dto/credentialDto";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRespository";

export const createCredential = async (credentialData: credentialDto): Promise<Credential> => {
    try {
        const credential = await CredentialRepository.create(credentialData);
        await CredentialRepository.save(credential);
        return credential;
    } catch (error: any) {
        throw new Error(`Error al crear las credenciales: ${error.message}`);
    }
};

export const validateCredential = async (validateData: credentialDto): Promise<number | null> => {
    const { username, password } = validateData;
    const foundCredential = await CredentialRepository.findOne({ where: { username } });

    if (!foundCredential || foundCredential.password !== String(password)) {
        return null; // Para luego validar en el controlador credenciales incorrectas
    }

    return foundCredential.id;
};


