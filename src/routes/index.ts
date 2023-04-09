import { Router } from "express";
import urlRouter from "./urls-routes";

const routes = Router()

routes.use("/urls", urlRouter)

export default routes;