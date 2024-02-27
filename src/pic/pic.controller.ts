import { Controller, Get, Post,UseInterceptors,UploadedFile,Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PicService } from './pic.service';
import { Public } from '../common/public.decorator';
import {FileInterceptor,FilesInterceptor} from '@nestjs/platform-express'
import { basename } from 'path';
@Controller('pic')
export class PicController {
  constructor(private readonly picService: PicService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // UseInterceptors 处理文件的中间件，file是一个标识名
  // UploadedFile装饰器是用于读取文件的
  upload (@UploadedFile() file) {
    console.log(file);
    const fileName = basename(file.path);
    console.log(fileName);
    const url = `https://server.rubbish-plus.top/files/${fileName}`;
    return this.picService.create({ picUrl:url });
  }

  // @Public()
  // @Post('upload')
  // upload (@Body() file) {
  //   console.log(file);
  //   return
  // }


  @Get()
  async findAll(@Query() query:{page:number,pageSize:number}) {
    const {page,pageSize} = query
    const total = await this.picService.getTotal();
    const pics = await this.picService.findAll(page, pageSize);
    return { total, pics }
  }


}
