import { Module } from '@nestjs/common';
import { PicService } from './pic.service';
import { PicController } from './pic.controller';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { Pic } from './entities/pic.entity';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [MulterModule.register({
    //图片上传完要存放的位置
    storage: diskStorage({
      destination: join(__dirname, '../images'),//存放的文件路径
      filename: (req, file, callback) => {
        //重新定义文件名，file.originalname 文件的原始名称
        // extname 获取文件后缀
        const fileName = `${new Date().getTime() + extname(file.originalname)}`;
        //返回新的名称，参数1是错误，这里用null就好
        return callback(null, fileName)
      }
    }),
  }
  ),TypeOrmModule.forFeature([Pic])],
  controllers: [PicController],
  providers: [PicService],
})
export class PicModule { }
