import credentialDto from "../dto/credentialDto";
import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";

export const createCredential = async (credendialData: credentialDto): Promise<Credential> => {
    const credential = await CredentialModel.create(credendialData);
    await CredentialModel.save(credential);
    return credential;
}

export const validateCredential = async (validateData: credentialDto): Promise<number> => {
    const { username, password } = validateData;
    const foundCredential = await CredentialModel.findOne({where: { username } });

    if (!foundCredential) { throw new Error("Credenciales incorrectas (usuario)"); }

    if (foundCredential.password !== String(password)) { throw new Error("Credenciales incorrectas (password)");}

    return foundCredential.id;
};



