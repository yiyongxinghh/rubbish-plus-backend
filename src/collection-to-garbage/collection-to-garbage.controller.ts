import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollectionToGarbageService } from './collection-to-garbage.service';
import { CreateCollectionToGarbageDto } from './dto/create-collection-to-garbage.dto';
import { UpdateCollectionToGarbageDto } from './dto/update-collection-to-garbage.dto';

@Controller('collection-to-garbage')
export class CollectionToGarbageController {
  constructor(private readonly collectionToGarbageService: CollectionToGarbageService) { }

  /**
   * POST 在指定的收藏夹中加入指定的废品
   * @param createCollectionToGarbageDto 
   * @returns 
   */
  @Post()
  create(@Body() createCollectionToGarbageDto: CreateCollectionToGarbageDto) {
    return this.collectionToGarbageService.create(createCollectionToGarbageDto);
  }

  /**
   * GET 根据指定废品id，得到收藏总数
   * @param query 
   * @returns 
   */
  @Get('/garbageCount')
  findGarbageCount(@Query('id') garbageId: number ){
    return this.collectionToGarbageService.findGarbageCount(garbageId);
  }

  /**
   * GET 根据指定的收藏id获取所有收藏列
   * @param collectionId 
   * @returns 
   */
  @Get(':id')
  findAll(@Param('collectionId') collectionId: string) {
    return this.collectionToGarbageService.findAll(+collectionId);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionToGarbageDto: UpdateCollectionToGarbageDto) {
    return this.collectionToGarbageService.update(+id, updateCollectionToGarbageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionToGarbageService.remove(+id);
  }
}
