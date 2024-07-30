import express from 'express'
import { getType, getVideo, getVideoDetail, getVideoPage, getVideoType } from '../controllers/video.controller.js'
import { middleWareToken, verifyToken } from '../config/jwt.js';

const videoRouter = express.Router()



import multer, { diskStorage } from 'multer'
// yarn add multer
// process.cwd(): trả về đường dẫn gốc của project
const upload = multer({

    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",// định nghĩa thư mục lưu file,
        filename: (req, file, callback) => { // đổi tên file

            //  ◦•●◉✿๖ۣۜ£¡ղƙ ✘¡ղƙ đẹρッ✿◉●•◦      .jpg
            // a-z, 0-9, A-Z

            let newName = new Date().getTime() + "_" + file.originalname; // 17442042443 , DD_MM_YYYY_hh_mm_ss_ms

            callback(null, newName)
        }
    })
})

videoRouter.post("/upload-video", upload.array("hinhAnh"), (req, res) => {

    let file = req.files


    res.send(file)

})

// file system
import fs from 'fs'

videoRouter.post("/upload-base", upload.single("hinhAnh"), (req, res) => {

    //  fs.writeFile(process.cwd() + "/data.txt", "hello node 43", (error) => { })

    let file = req.file


    fs.readFile(process.cwd() + "/public/imgs/" + file.filename, (error, data) => {
        let base64 = `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64")

        res.send(base64)

    })


})



// lấy danh sách video
videoRouter.get("/get-video", getVideo)



// lấy danh sách loại video
videoRouter.get("/get-type", getType)

// lấy danh sách video theo loại video
videoRouter.get("/get-video-type/:typeId", getVideoType)

// lấy danh sách video pagination
videoRouter.get("/get-video-page/:page", middleWareToken, getVideoPage)

// lấy thông tin chi tiết video
videoRouter.get("/get-video-detail/:videoId", getVideoDetail)


export default videoRouter  