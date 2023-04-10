import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { validateSchema } from "../middlewares/validatMiddleware.js";
import { schemaSignup, schemaSignin } from "../schemas/auth-schemas.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(schemaSignup), userController.signup);
userRouter.post("/signin", validateSchema(schemaSignin), userController.signin);

export default userRouter;
