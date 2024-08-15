import { HttpException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VideoService {

  prisma = new PrismaClient()

  constructor(
    private configService: ConfigService,

    private prismaService: PrismaService
  ) { }

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll(user) {
    // this.configService.get("DATABASE_URL")
    try {
      let data = await this.prismaService.video.findMany()
      return data;
    }
    catch (error) {
      throw new HttpException("Lỗi Server", 500);
    }
  }

  async findOne(id: number) {
    let data = await this.prismaService.video.findMany({
      where: {
        video_id: id
      }
    })
    return data

  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
