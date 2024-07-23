import express from 'express'
import { forgetCheckCode, forgetCheckEmail, login, loginFacebook, signUp } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// đăng ký 

authRouter.post("/sign-up", signUp)

// đăng nhập
authRouter.post("/login", login)

// login facebook
authRouter.post("/login-face",loginFacebook)


// kiểm tra quên mật khẩu
authRouter.post("/forget-check-email", forgetCheckEmail)



// kiểm tra CODE
authRouter.post("/forget-check-code", forgetCheckCode)


// đổi mật khẩu


export default authRouter
