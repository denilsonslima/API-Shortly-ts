import httpStatus from "http-status";
import { AuthenticatedRequest } from "../protocols";
import { NextFunction, Response, Request } from "express";
import urlsServices from "../services/urls-services.js";


async function create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { url } = req.body;
  const {id} = res.locals.user;
  try {
    const data = await urlsServices.create(url, id)
    res.status(httpStatus.CREATED).send(data)
  } catch (error) {
    res.send(error)
  }
}

async function find(req: Request, res: Response) {
  const {id} = req.params;
  try {
    const data = await urlsServices.find(+id)
    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

async function redirectToUrl(req: Request, res: Response) {
  const {shortUrl} = req.params;
  try {
    const data = await urlsServices.redirect(shortUrl)
    res.redirect(data.url)
  } catch (error) {
    res.status(500).send(error)
  }
}

async function deleteById(req: Request, res: Response) {
  const {id} = req.params;
  const userId = res.locals.user.id;
  try {
    await urlsServices.deleteById(id, userId)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  create,
  find,
  redirectToUrl,
  deleteById
}
