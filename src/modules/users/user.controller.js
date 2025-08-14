import { Router } from "express";
import * as UC from "./user.service.js";


import * as UV from "./user.validation.js"
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";

export const userRouter = Router();
userRouter.post("/signup", validation(UV.signUpSchema), UC.signUp);
userRouter.post("/signin", UC.signIn);
userRouter.get("/profile", authentication, UC.getProfile);