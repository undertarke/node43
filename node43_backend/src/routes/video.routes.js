import express from 'express'
import { getType, getVideo, getVideoDetail, getVideoPage, getVideoType } from '../controllers/video.controller.js'
import { middleWareToken, verifyToken } from '../config/jwt.js';

import compress_images from 'compress-images';

// file system
import fs from 'fs'
import { upload } from '../config/upload.js';

const videoRouter = express.Router()

videoRouter.post("/upload-video", upload.single("hinhAnh"), (req, res) => {

    let file = req.file

    compress_images(
        process.cwd() + "/public/imgs/" + file.filename,
        process.cwd() + "/public/file/",
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "15"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },

        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }

    );

    // ORM sequelize update 

    res.send(file)

})


videoRouter.post("/upload-base", upload.single("hinhAnh"), (req, res) => {

    //  fs.writeFile(process.cwd() + "/data.txt", "hello node 43", (error) => { })

    let file = req.file


    fs.readFile(process.cwd() + "/public/imgs/" + file.filename, (error, data) => {
        let base64 = `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64")

        res.send(base64)

    })


})



// lấy danh sách video
videoRouter.get("/get-video",middleWareToken, getVideo)



// lấy danh sách loại video
videoRouter.get("/get-type", getType)

// lấy danh sách video theo loại video
videoRouter.get("/get-video-type/:typeId", getVideoType)

// lấy danh sách video pagination
videoRouter.get("/get-video-page/:page", middleWareToken, getVideoPage)

// lấy thông tin chi tiết video
videoRouter.get("/get-video-detail/:videoId", getVideoDetail)


export default videoRouter  