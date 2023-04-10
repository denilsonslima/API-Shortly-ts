import { Router } from "express";
import urlRouter from "./urls-routes.js";
import userRouter from "./user-routes.js"

const routes = Router()

routes.use("/urls", urlRouter)
routes.use(userRouter)

export default routes;