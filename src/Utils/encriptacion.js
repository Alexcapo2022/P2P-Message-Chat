import bcrypt from 'bcrypt';

const saltRounds = 10;

export const encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

export const compararPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}
