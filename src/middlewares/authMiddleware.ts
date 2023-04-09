import { NextFunction, Request, Response } from "express";
import authRepositories from "../repositories/auth-repositories";

export async function authValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;  
  console.log(authorization)


  try {
   

  } catch (error) {
    res.status(500).send(error);
  }
}
