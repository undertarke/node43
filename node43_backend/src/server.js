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




// B1: yarn add prisma @prisma/client
// B2: yarn prisma init    // (npx prisma init)
// B3: cập nhật lại chuỗi kết nối database
// B4: chạy databasefirst => yarn prisma db pull    // (npx prisma db pull)

// B5: yarn prisma generate 

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

app.get("/get-user", async (req, res) => {
    let data = await prisma.users.findMany()
    res.send(data)
})




// yarn add socket.io => server riêng chạy realtime => port riêng

// import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// const app = express();
const httpServer = createServer(app);

// đối tượng socket server
const io = new Server(httpServer, { /* options */
    cors: {
        origin: "*"
    }
});

// hàm lắng nghe: on
// tham số 1: nhận key (key của socket quy định hoặc tự mình quy định)
// tham số 2: function

// dùng để nhận biết client kết nối vào server 
let number = 0
io.on("connection", (socket) => {
    // socket client
    // console.log(socket.id)

    // hàm gửi dữ liệu: emit
    // tham số 1: key tự quy định
    // tham số 2: dữ liệu muốn gửi đi (string,number, object, list,...)
    // io.emit("send-socket-id", socket.id)

    // socket.on("send-click", () => {

    //     io.emit("send-number", number++)

    // })


    // socket.on("disconnect", (reason, desc) => {
    //     // console.log(reason)
    // })


    // room
    socket.on("join-room", async (roomId) => {

        socket.join(roomId)

        let data = await prisma.chat.findMany({
            where: {
                room_id: roomId
            }
        })

        io.to(roomId).emit("data-chat", data)

    })

    // message, userId, roomId
    socket.on("send-mess", async (data) => {

        let newChat = {
            user_id: data.userId,
            content: data.message,
            room_id: data.roomId,
            date: new Date()
        }
        await prisma.chat.create({ data: newChat })

        io.to(data.roomId).emit("sv-send-mess", data)

    })


});


httpServer.listen(8081);