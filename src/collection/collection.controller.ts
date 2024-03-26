import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  /**
   * POST 创建收藏夹
   * @param createCollectionDto 
   * @returns 
   */
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  /**
   * GET 根据指定收藏夹名称获取指定收藏夹
   * @param collectionName 
   * @returns 
   */
  @Get('/findNameOne')
  findNameOne(@Query('collectionName') collectionName: string){
    return this.collectionService.findNameOne(collectionName);
  }

  /**
   * GET 根据用户id找到所有收藏夹
   * @param id 
   * @returns 
   */
  @Get(':id')
  findAll(@Param('id') userId: number) {
    return this.collectionService.findAll(userId);
  }

  /**
   * DELETE 删除指定id的收藏夹
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
