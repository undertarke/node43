// quản lý các đối tượng router


import express from 'express'
import userRouter from './user.router.js'
import videoRouter from './video.routes.js'

const rootRouter = express.Router()

rootRouter.use("/user", userRouter)

rootRouter.use("/video", videoRouter)

export default rootRouter

// lcoalhost:8080/user/create-user