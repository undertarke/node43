import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *  as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // nhận vào lớp đối tượng  App Module

  // mở chặn truy cập
  app.enableCors()
  app.use(express.static("."))

  // định nghĩa port 
  // khởi động server BE, định nghĩa những cấu hình server


  // yarn add @nestjs/swagger swagger-ui-express
  const config = new DocumentBuilder().setTitle("Node 43").setVersion("100").setDescription("đây là mô tả").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/swagger", app, document)

  await app.listen(8080);
}
bootstrap();

// yarn start: node ...
// yarn start:dev => nodemon , --watch


// module => quản lý theo đối tượng

// - module: kết nối controller, service của đối tượng đó và kết nối đến các module của đối tượng khác
// - controller: định nghĩa API (request, response)
// - service (provider): định nghĩa chức năng, logic, tính toán,...


// @... : decorator

// generate module cho đối tượng
// nest g resource video --no-spec

// B1: yarn add prisma @prisma/client
// B2: yarn prisma init
// B3: update .env và schema.prisma
// B4: yarn prisma db pull
// B5: yarn prisma generate


// setup get get biến môi trường

// yarn add @nestjs/config
