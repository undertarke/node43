// node_modules: source thư viện
// package.json: chứa tên và version của thư viện => yarn init => enter tới chết...

// yarn add express

import express from 'express'

const app = express();
// khai báo middleware
app.use(express.json())

// yarn add cors
import cors from 'cors'
app.use(cors({
    origin:["http://localhost:5500","https://google.com","http://google.com"]
})) //  cho phép tất cả domain truy cập

// localhost:8080
// hàm khởi tạo server với port tự định nghĩa
app.listen(8080)

// cách mới: node v20.11 trở lên => node --watch  server.js
// cách cũ: node v20 trở xuống => yarn add nodemon

// yarn start

// tham số 1: endpoint
// tham số 2: function
// Rest params: (...rest)=>{}
// quy tắc đặt tên: viết thường cách nhau bằng gạch ngang
app.get("/demo/:idH", (req, res) => {

    // 2 cách
    // - truyền qua đường dẫn: (luôn luôn là kiểu string)
    //   + query string: localhost:8080/demo/2?id=1&hoTen=abc&email=a@gmail.com

    let { id, hoTen } = req.query

    //   + query params: localhost:8080/demo/1
    let { idH } = req.params


    // - truyền qua body (json)
    let { ma, ten, email } = res.body



    // trả về FE
    res.status(200).send({ id, hoTen, idH, ma, ten, email }) // kiểu dữ trả về tất cả trừ number

})


app.post("/demo/:idH", (req, res) => { })
// app.put()
// app.delete()




import mysql2 from 'mysql2'

// chuỗi kết nối
const connect = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3306",
    database: "db_movie"
})


// câu truy vấn => SELECT * FROM users
// then catch
// async await
app.get("/get-user", (req, res) => {

    // 

    connect.query("SELECT * FROM users", (err, result) => {
        
        res.send(result)
        
    }) // list object 20 phần tử


})

// ORM sequelize, prisma