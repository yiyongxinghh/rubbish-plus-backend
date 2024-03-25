import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { PicService } from './pic.service';
import { Public } from '../common/public.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { join, basename } from 'path';
import * as fs from 'fs';
import { UpdatePicDto } from './dto/update-pic.dto';
@Controller('pic')
export class PicController {
  constructor(private readonly picService: PicService) { }

  /**
   * POST 上传图片
   * 如果有
   * @param file 
   * @returns 
   */
  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // UseInterceptors 处理文件的中间件，file是一个标识名
  // UploadedFile装饰器是用于读取文件的
  async upload(@UploadedFile() file) {
    const fileName = basename(file.path);
    console.log(file, fileName);
    const url = `https://server.rubbish-plus.top/files/${fileName}`;
    return this.picService.create({ picUrl: url });
  }

  /**
   * GET 获取所有图片，自带分页
   * @param query 
   * @returns 
   */
  @Get()
  async findAll(@Query() query: { page: number, pageSize: number }) {
    const { page, pageSize } = query
    const total = await this.picService.getTotal();
    const pics = await this.picService.findAll(page, pageSize);
    return { total, pics }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@UploadedFile() file, @Param('id') id: number) {
    await this.remove(id)
    const picUrl = `https://server.rubbish-plus.top/files/${basename(file.path)}`;
    return this.picService.create({ id, picUrl });
  }

  /**
   * DELETE 根据指定id移除图片
   * @param id 
   * @returns 
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // 找到需要删除的图片记录
    const pic = await this.picService.findOne(id);
    // 如果找到了图片记录
    if (pic) {
      // 从内存中删除文件
      const fileName = pic.picUrl.substring(pic.picUrl.lastIndexOf('/') + 1);
      const filePath = join(__dirname, '..', 'images', fileName);
      console.log(fileName, filePath, pic);
      fs.unlinkSync(filePath); // 替换为实际的文件路径
      // 从数据库中删除图片记录
      await this.picService.remove(id);
    } else {
      throw new HttpException({ message: `图片未找到` }, 500)
    }
  }
}
