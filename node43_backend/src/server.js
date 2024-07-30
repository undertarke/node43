// node_modules: source thư viện
// package.json: chứa tên và version của thư viện => yarn init => enter tới chết...
// yarn add express
import express from 'express'
import rootRouter from './routes/rootRouter.js';
import cors from 'cors'

const app = express();
// khai báo middleware
app.use(express.json())

app.use(express.static(".")) // định vị load thư mục tài nguyên

// yarn add cors
app.use(cors()) //  cho phép tất cả domain truy cập

// localhost:8080
// hàm khởi tạo server với port tự định nghĩa
app.use(rootRouter)

app.listen(8080)

// cách mới: node v20.11 trở lên => node --watch  server.js
// cách cũ: node v20 trở xuống => yarn add nodemon

// yarn start

// tham số 1: endpoint
// tham số 2: function
// Rest params: (...rest)=>{}
// quy tắc đặt tên: viết thường cách nhau bằng gạch ngang
// app.get("/demo/:idH", (req, res) => {

//     // 2 cách
//     // - truyền qua đường dẫn: (luôn luôn là kiểu string)
//     //   + query string: localhost:8080/demo/2?id=1&hoTen=abc&email=a@gmail.com

//     let { id, hoTen } = req.query

//     //   + query params: localhost:8080/demo/1
//     let { idH } = req.params


//     // - truyền qua body (json)
//     let { ma, ten, email } = res.body



//     // trả về FE
//     res.status(200).send({ id, hoTen, idH, ma, ten, email }) // kiểu dữ trả về tất cả trừ number

// })

// yarn add swagger-ui-express swagger-jsdoc

import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'


const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}
const specs = swaggerJsDoc(options);


app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// yarn add nodemon