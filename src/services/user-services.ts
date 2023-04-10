import { CreateUser, CreateUserParams } from "../protocols.js";
import userRepositories from "../repositories/user-repositories.js";
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from 'uuid'

async function signup({ name, email, password }: CreateUser) {
    const {rowCount} = await userRepositories.findByEmail(email)
    if(rowCount) throw new Error("Email existe")

    const senhaCriptografada = bcrypt.hashSync(password, 10)

    await userRepositories.signup({name, email, senhaCriptografada})
}

async function signin({email, password}: CreateUserParams) {
    const {rows: [user], rowCount} = await userRepositories.findByEmail(email)
    if(!rowCount) throw new Error("Email não encontrado")

    const validPassword = await bcrypt.compare(password, user.password)

    if(!validPassword) throw new Error("senha incorreta")

    const token = uuidV4();

    await userRepositories.createSession({token, id: user.id})
    return {token}
}

export default {
    signup,
    signin
}