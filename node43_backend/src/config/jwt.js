// Chức năng token dùng để xác thực hoặc truyền dữ liệu liên quan đến user
import jwt from 'jsonwebtoken'
// yarn add jsonwebtoken

export const createToken = (data) => {
    // tham số 1 payload: string, buffer, object
    // tham số 2 signalture (secret key)
    // tham số 3 header
    return jwt.sign({ data: data }, "NODE_43", { algorithm: "HS256", expiresIn: "5m" })
}

export const verifyToken = (token) => {
    // khác khóa bí mật
    // kiểm tra token 
    // hợp lệ error = null, ko hợp lệ error != null

    return jwt.verify(token, "NODE_43", (error) => { return error })
}

export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const middleWareToken = (req, res, next) => {
    next()

    // let { token } = req.headers;

    // let checkToken = verifyToken(token)
    // if (checkToken == null) {

    //     next()

    // } else {
    //     console.log(checkToken)
    //     res.status(401).send("Authorized")
    // }
}