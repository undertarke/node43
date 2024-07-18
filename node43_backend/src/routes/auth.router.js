import express from 'express'
import { login, signUp } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// đăng ký 

authRouter.post("/sign-up", signUp)

// đăng nhập
authRouter.post("/login", login)


export default authRouter
