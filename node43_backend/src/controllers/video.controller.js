import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import { PrismaClient } from '@prisma/client'

const model = initModels(sequelize)

const prisma = new PrismaClient()

const getVideo = async (req, res) => {

    //SELECT * FROM video WHERE video_id = 1
    // let data = await model.video.findAll({where});

    let { videoId } = req.query;

    let data = await prisma.video_type.findMany({
        where: {
            type_id: Number(videoId)
        },

        include: {
            video: {
                include: {
                    users: true
                }
            }
        }
    })


    // tìm kiếm trả về object
    // model.video.findOne()
    // prisma.video.findFirst()
    // prisma.video.findUnique()

    // // thêm
    // let newData = { video_id, video_name }
    // model.video.create(newData)
    // prisma.video.create({ data: newData })

    // // sửa
    // model.video.update(newData, { where })
    // prisma.video.update({ data: newData, where })

    // // xóa
    // model.video.destroy()
    // prisma.video.delete()


    // res.send(data)
    responseData(data, "Thành công", 200, res);
}

const getType = async (req, res) => {
    let data = await model.video_type.findAll();

    // res.send(data)
    responseData(data, "Thành công", 200, res);

}


const getVideoType = async (req, res) => {

    let { typeId } = req.params;

    let data = await model.video.findAll({
        where: {
            type_id: typeId
        }
    })

    // res.send(data);
    responseData(data, "Thành công", 200, res);

}

const getVideoPage = async (req, res) => {
    let { page } = req.params

    let pageSize = 3;

    let index = (page - 1) * pageSize;

    //SELECT * FROM video LIMIT index, pageSize
    // [{},{}]
    let data = await model.video.findAll({
        offset: index,
        limit: pageSize
    })

    let totalPage = Math.ceil(await model.video.count() / pageSize)

    responseData({ data, totalPage }, "Thành công", 200, res);

}


const getVideoDetail = async (req, res) => {
    let { videoId } = req.params;

    // {}
    let data = await model.video.findOne({
        where: {
            video_id: videoId
        },
        include: ["user"]
    })

    // tìm theo Primary Key
    // data = await model.video.findByPk(videoId);


    responseData(data, "Thành công", 200, res);

}


export { getVideo, getType, getVideoType, getVideoPage, getVideoDetail }