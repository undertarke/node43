import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js"
import { responseData } from '../config/response.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { sendMail } from "../config/mail.js"
import { createToken } from "../config/jwt.js"

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

            let token = createToken({ userId: checkEmail.dataValues.user_id })

            responseData(token, "Đăng nhập thành công", 200, res);
        }
        else {
            responseData("", "Mật khẩu không đúng !", 403, res);

        }
    } else {
        responseData("", "Email không đúng !", 403, res);
    }


}



const loginFacebook = async (req, res) => {

    let { face_app_id, full_name, email } = req.body

    // check face_app_id
    let checkUser = await model.users.findOne({
        where: {
            face_app_id
        }
    })

    // chưa tồn tại
    if (!checkUser) {

        let newData = {
            full_name,
            email,
            avatar: "",
            pass_word: "", //salt
            face_app_id,
            role: "USER",
            refresh_token: ""
        }

        // INSERT INTO VALUES
        await model.users.create(newData)


    }

    // đã tồn tại

    let token = createToken({ userId: checkUser.dataValues.user_id })

    responseData(token, "Đăng nhập thành công", 200, res);


}



const forgetCheckEmail = async (req, res) => {
    let { email } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email
        }
    })

    if (checkEmail) {

        // tạo code
        let randomCode = crypto.randomBytes(5).toString('hex')
        let newCode = {
            code: randomCode,
            expired: new Date(new Date().getTime() + 10 * 60000)
        }

        await model.code.create(newCode);

        // gửi mail
        sendMail(email, "Mã xác thực", "<b style='color:red'>" + randomCode + "</b>")


        responseData("", "Thành công", 200, res);


    } else {
        responseData("", "Email không đúng !", 403, res);
    }

}

const forgetCheckCode = async (req, res) => {
    let { code } = req.body

    let checkCode = await model.code.findOne({
        where: {
            code
        }
    })

    if (checkCode) {

        // xóa code
        // DELETE FROM code
        await model.code.destroy({
            where: {
                id: checkCode.dataValues.id
            }
        })

        responseData("", "Thành công", 200, res);

    } else {

        responseData("", "Code không đúng !", 403, res);
    }
}

export { signUp, login, loginFacebook, forgetCheckEmail, forgetCheckCode }