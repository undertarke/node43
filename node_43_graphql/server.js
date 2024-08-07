// 1: yarn init 
// 2: cập nhật lại package.json
// 3: yarn add express 
// 4: setup server
import express from 'express'

const app = express()
app.listen(8080)


// ko có chức năng truy vấn dữ liệu


// yarn add graphql express-graphql
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'


// khởi tạo đối tượng => phải khởi tạo qua dạng chuỗi
const schema = buildSchema(`
    
    type User{
        id: Int
        name: String
        email: String
    }

    type Video_Type{
        type_id: Int
        type_name: String
        icon: String
    }

    type Video{
        video_id: Int
        video_name: String
        thumbnail: String
        description: String
        views: Int
        source: String
        user_id: Int
        type_id: Int

        video_type: Video_Type
    }

    type Query {
        getVideo(id: Int , name: String ): [Video]
    }

    type Mutation {
        createVideo: [Int]
    }


    `)







import { PrismaClient } from '@prisma/client'
let prisma = new PrismaClient()
const resolver = {
    getVideo: async ({ id, name }) => {

        return await prisma.video.findMany({
            where: {
                video_id: id
            },

            include: {
                video_type: true
            }
        })
    },

    createVideo: () => {
        return [2, 3, 5, 6]
    },

}



// endpoint truy cập vào UI để thao tác lệnh với graphql
app.use("/grap", graphqlHTTP({
    schema: schema, // khai báo đối tượng, và các TÊN hàm của graphql
    rootValue: resolver, // định nghĩa chức năng của các hàm đã khai báo ở schema (nơi đổ data vào)
    graphiql: true // kích hoạt UI
}))

// B1: yarn add prisma @prisma/client
// B2: yarn prisma init
// B3: Cập nhật lại .env và schema.prisma
// B4: yarn prisma db pull
// B5: yarn prisma generate