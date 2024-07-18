import express from 'express'
import { getType, getVideo, getVideoDetail, getVideoPage, getVideoType } from '../controllers/video.controller.js'

const videoRouter = express.Router()


// lấy danh sách video
videoRouter.get("/get-video", getVideo)

// lấy danh sách loại video
videoRouter.get("/get-type", getType)

// lấy danh sách video theo loại video
videoRouter.get("/get-video-type/:typeId", getVideoType)

// lấy danh sách video pagination
videoRouter.get("/get-video-page/:page", getVideoPage)

// lấy thông tin chi tiết video
videoRouter.get("/get-video-detail/:videoId", getVideoDetail)


export default videoRouter  