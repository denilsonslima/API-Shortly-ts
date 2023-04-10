import { Response, Request } from "express";
import { CreateUser } from "../protocols.js";
import userServices from "../services/user-services.js";

async function signup(req: Request, res: Response) {
    const {name, email, password, confirmPassword} = req.body as CreateUser
    try {
        await userServices.signup({name, email, password, confirmPassword})
        res.send(201)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function signin(req: Request, res: Response) {
    const {email, password} = req.body
    try {
        const data = await userServices.signin({email, password})
        console.log(data)
        res.send(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

export default {
    signup,
    signin
}