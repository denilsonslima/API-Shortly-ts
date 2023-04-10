import { NextFunction, Request, Response } from "express";
import authRepositories from "../repositories/auth-repositories.js";

export async function authValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(422).send("invalid token!");

  const [Bearer, token] = authorization.split(" ");

  if (!token || !Bearer || Bearer !== "Bearer")
    return res.status(422).send("invalid token!");

  try {
    const {
      rows: [user], rowCount
    } = await authRepositories.validateToken(token);
    if(rowCount < 1) return res.status(422).send("invalid token!")
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
