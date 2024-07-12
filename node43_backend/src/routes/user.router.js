// định nghĩa API

import { createUser, getUser } from "../controllers/user.controller.js";
import express from 'express'

const userRouter = express.Router();

userRouter.get("/get-user", getUser)

userRouter.post("/create-user", createUser)



export default userRouter



// chuỗi kết nối
// const connect = mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     port: "3306",
//     database: "db_movie"
// })


// câu truy vấn => SELECT * FROM users
// then catch
// async await