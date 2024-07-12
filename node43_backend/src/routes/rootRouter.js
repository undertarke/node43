// quản lý các đối tượng router


import express from 'express'
import userRouter from './user.router.js'

const rootRouter = express.Router()

rootRouter.use("/user",userRouter)

// rootRouter.use("/product",productRouter)

export default rootRouter

// lcoalhost:8080/user/create-user