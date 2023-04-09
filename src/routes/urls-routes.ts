import { Router } from "express";
import { authValidate } from "../middlewares/authMiddleware";
import urlsController from "../controllers/urls-controller";

const urlRouter = Router()

urlRouter.post("/shorten", authValidate, urlsController.create)

export default urlRouter