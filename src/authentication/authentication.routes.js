import { Router } from "express";
import * as AuthRouter from "./controller/authentication.js";
const router = Router();

router.post( "/signup",AuthRouter.SignUp);
router.post("/signIn",AuthRouter.SignIn);

export default router;
