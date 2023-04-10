import { Router } from "express";
import { authValidate } from "../middlewares/authMiddleware.js";
import urlsController from "../controllers/urls-controller.js";
import { validateSchema } from "../middlewares/validatMiddleware.js";
import { urlSchema } from "../schemas/url-schemas.js";

const urlRouter = Router();

urlRouter.post("/shorten", validateSchema(urlSchema), authValidate, urlsController.create);
urlRouter.get("/:id", urlsController.find);
urlRouter.get("/open/:shortUrl", urlsController.redirectToUrl);
urlRouter.delete("/:id", authValidate, urlsController.deleteById);

export default urlRouter;
