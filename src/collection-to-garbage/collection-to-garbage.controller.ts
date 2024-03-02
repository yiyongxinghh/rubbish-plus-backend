import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionToGarbageService } from './collection-to-garbage.service';
import { CreateCollectionToGarbageDto } from './dto/create-collection-to-garbage.dto';
import { UpdateCollectionToGarbageDto } from './dto/update-collection-to-garbage.dto';

@Controller('collection-to-garbage')
export class CollectionToGarbageController {
  constructor(private readonly collectionToGarbageService: CollectionToGarbageService) {}

  @Post()
  create(@Body() createCollectionToGarbageDto: CreateCollectionToGarbageDto) {
    return this.collectionToGarbageService.create(createCollectionToGarbageDto);
  }

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
