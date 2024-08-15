import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto, FilesUploadDto, FileUploadDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

//  yarn add  @types/multer

const storage = {
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
  })
}

// @ApiBearerAuth()
// @UseGuards(AuthGuard("jwt_node"))
@ApiTags("video")
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService,
    private configService: ConfigService,
    // private jwtService: JwtService
  ) { }


  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto
  })
  @UseInterceptors(FileInterceptor("hinhAnh", storage))
  @Post("/upload")
  upload(@UploadedFile() file: Express.Multer.File): any {

    return file
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDto
  })
  @UseInterceptors(FilesInterceptor("hinhAnh", 20, storage))
  @Post("/upload-multiple")
  uploadMultiple(@UploadedFiles() file: Express.Multer.File[]) {

    return file
  }






  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt_node"))
  @Get()
  findAll(@Req() req) {
    // token get từ headers
    // check token
    // if (this.jwtService.verifyAsync("token", { secret: "SECRET_KEY" })) {

    // }

    let data = req.user
    console.log(data)

    return this.videoService.findAll({ id: 2, email: "abc" })
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}

