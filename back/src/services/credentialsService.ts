import credentialDto from "../dto/credentialDto";
import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRespository";

export const createCredential = async (credentialData: credentialDto): Promise<Credential> => {
    try {
        const credential = await CredentialModel.create(credentialData);
        await CredentialModel.save(credential);
        return credential;
    } catch (error: any) {
        throw new Error(`Error al crear las credenciales: ${error.message}`);
    }
};

export const validateCredential = async (validateData: credentialDto): Promise<number> => {
    try {
        const { username, password } = validateData;
        const foundCredential = await CredentialModel.findOne({ where: { username } });

        if (!foundCredential) {throw new Error("Credenciales incorrectas");}

        if (foundCredential.password !== String(password)) { throw new Error("Credenciales incorrectas");}
        return foundCredential.id;
    } catch (error: any) {
        throw error;
    }
};


