import { Router } from "express";
import handleLogin from "./controllers/login.controller";
import handleSignUp from "./controllers/signup.controller";

const userRouter = Router();

userRouter.post('/signup', handleSignUp);
userRouter.post('/login', handleLogin);

export default userRouter;