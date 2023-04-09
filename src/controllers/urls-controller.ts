import httpStatus from "http-status";
import { AuthenticatedRequest } from "../protocols";
import { NextFunction, Response } from "express";
import urlsServices from "../services/urls-services";

async function create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { url } = req;
  try {
    await urlsServices.create(url)
    res.sendStatus(httpStatus.CREATED)
  } catch (error) {
    res.send(error)
  }
}

export default {
  create
}
