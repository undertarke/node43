import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

// entites (DAO): model map với table trong csdl
// DTO (data transfer object): model phục vụ truyền dẫn dữ liệu

type userType = {
  hoTen: String
  email: String
}

@ApiTags("app")
@Controller("/app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {

    // response
    return this.appService.getHello();
  }

  @HttpCode(200)
  @Get("/demo/:id2/:name2")
  getDemo(@Req() req: Request, @Res() res: Response,
    @Query("id") id: string, @Query("name") name: string,
    @Param("id2") id2: string, @Param("name2") name2: string,
    @Body() body: userType
  ) {

    // request
    // query string: ?id=1&name=tony
    // let { id, name } = req.query

    // // query params:  /1/tony
    // let { id2, name2 } = req.params

    // // body: { hoTen: "tony", email="tony@gmail.com"}
    let { hoTen, email } = body

    res.send({ id, name, id2, name2, hoTen, email })

    return { id, name, id2, name2, hoTen, email }
  }

  @Get("/get-number")
  getNumber() {
    return this.appService.getNumber()
  }

}



// endpoint, method