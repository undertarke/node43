import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

//  yarn add  @types/multer

const storage = {
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
  })
}

@ApiTags("video")
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService,
    private configService: ConfigService

  ) { }

  @UseInterceptors(FileInterceptor("hinhAnh", storage))
  @Post("/upload")
  upload(@UploadedFile() file: Express.Multer.File): any {

    return file
  }


  @UseInterceptors(FilesInterceptor("hinhAnh", 20, storage))
  @Post("/upload-multiple")
  uploadMultiple(@UploadedFiles() file: Express.Multer.File[]) {

    return file
  }



  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  findAll() {

    return this.videoService.findAll({id:2,email:"abc"});
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

