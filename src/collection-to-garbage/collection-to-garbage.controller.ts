import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionToGarbageService } from './collection-to-garbage.service';
import { CreateCollectionToGarbageDto } from './dto/create-collection-to-garbage.dto';
import { UpdateCollectionToGarbageDto } from './dto/update-collection-to-garbage.dto';

@Controller('collection-to-garbage')
export class CollectionToGarbageController {
  constructor(private readonly collectionToGarbageService: CollectionToGarbageService) {}

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
   * GET 根据指定的收藏夹id来获取所有的废品
   * @param collectionId 
   * @returns 
   */
  @Get(':id')
  findAll(@Param('id') collectionId: number) {    
    return this.collectionToGarbageService.findAll(collectionId);
  }

  /**
   * DELETE 根据指定的收藏夹id,删除其中的指定废品id
   * @param body 
   * @returns 
   */
  @Delete('/remove')
  remove(@Body() body: {colletcionId: number, garbageId: number}) {
    return this.collectionToGarbageService.remove(body.colletcionId, body.garbageId);
  }
}
