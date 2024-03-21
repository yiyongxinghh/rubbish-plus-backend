import { Injectable } from '@nestjs/common';
import { CreateCollectionToGarbageDto } from './dto/create-collection-to-garbage.dto';
import { UpdateCollectionToGarbageDto } from './dto/update-collection-to-garbage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionToGarbage } from './entities/collection-to-garbage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionToGarbageService {
  constructor(@InjectRepository(CollectionToGarbage) private readonly collectionToGarbage: Repository<CollectionToGarbage>) { }

  /**
   * 在指定的收藏夹中加入指定的废品
   * @param createCollectionToGarbageDto 
   * @returns 
   */
  create(createCollectionToGarbageDto: CreateCollectionToGarbageDto) {
    return this.collectionToGarbage.createQueryBuilder().insert().into(CollectionToGarbage)
      .values(createCollectionToGarbageDto).execute();
  }

  /**
   * 根据指定的收藏id获取所有收藏列
   * @param collectionId 
   * @returns 
   */
  findAll(collectionId: number) {
    return this.collectionToGarbage.createQueryBuilder('collectionToGarbage')
      .where('collectionToGarbage.collection=:collectionId', { collectionId })
      .getMany();
  }

  /**
   * 根据指定废品id，得到收藏总数
   * @param garbageId 
   * @returns 
   */
  findGarbageCount(garbageId: number) {
    return this.collectionToGarbage.createQueryBuilder('collectionToGarbage')

      .where('collectionToGarbage.garbage=:garbageId', { garbageId })
      .getCount();
  }


  update(id: number, updateCollectionToGarbageDto: UpdateCollectionToGarbageDto) {
    return `This action updates a #${id} collectionToGarbage`;
  }

  remove(garbageId: number,collectionId:number) {
    return this.collectionToGarbage.createQueryBuilder('collectionToGarbage').delete()
      .from(CollectionToGarbage).where('garbageGarbageId = :garbageId', { garbageId })
      .andWhere('collectionCollectionId = :collectionId', { collectionId })
      .execute();
  }
}
