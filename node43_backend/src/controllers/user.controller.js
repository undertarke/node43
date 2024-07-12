// xử lý chức năng của riêng đối tượng user
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const model = initModels(sequelize)

const getUser = async (req, res) => {

    // SELECT * FROM users WHERE user_id = 3
    let data = await model.video.findAll({
        where: {
            video_id: 3
        },
        include: ["type","user"]
    });

    res.send(data)

}

const createUser = (req, res) => {

}

export {
    getUser,
    createUser
}