import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";


const model = initModels(sequelize)


const getVideo = async (req, res) => {

    //SELECT * FROM video
    let data = await model.video.findAll();

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
        include:["user"]
    })

    // tìm theo Primary Key
    // data = await model.video.findByPk(videoId);


    responseData(data, "Thành công", 200, res);

}


export { getVideo, getType, getVideoType, getVideoPage, getVideoDetail }