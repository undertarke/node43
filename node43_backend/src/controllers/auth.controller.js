import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js"
import { responseData } from '../config/response.js'
import bcrypt from 'bcrypt'
// bcrypt: mã hóa 1 chiều

const model = initModels(sequelize);


// thêm dữ liệu
const signUp = async (req, res) => {

    let { full_name, email, pass_word } = req.body;

    // check trùng email
    let checkEmail = await model.users.findOne({
        where: {
            email
        }
    })

    // response.send() không giúp dừng câu lệnh 
    if (checkEmail) {
        responseData("", "Email đã tồn tại !", 409, res);
        return;
    }

    let newData = {
        full_name,
        email,
        avatar: "",
        pass_word: bcrypt.hashSync(pass_word, 10), //salt
        face_app_id: "",
        role: "USER",
        refresh_token: ""
    }

    // INSERT INTO VALUES
    await model.users.create(newData)

    responseData("", "Đăng ký thành công", 201, res);

}

const login = async (req, res) => {

    // check email và password nó trùng với dữ liệu trong table users
    let { email, pass_word } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email
        }
    })

    if (checkEmail) {

        if (bcrypt.compareSync(pass_word, checkEmail.pass_word)) {

            let token = ""
            responseData(token, "Đăng nhập thành công", 200, res);
        }
        else {
            responseData("", "Mật khẩu không đúng !", 403, res);

        }
    } else {
        responseData("", "Email không đúng !", 403, res);
    }


}

export { signUp, login }