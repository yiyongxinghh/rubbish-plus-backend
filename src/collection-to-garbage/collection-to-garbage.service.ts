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
   * 根据指定的收藏夹id来获取所有的废品
   * @param collectionId 
   * @returns 
   */
  findAll(collectionId: number) {
    return this.collectionToGarbage.createQueryBuilder('collectionToGarbage')
      .leftJoinAndSelect('collectionToGarbage.garbage', 'garbage')
      .leftJoinAndSelect('garbage.pic', 'pic')
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

  /**
   * 根据指定的收藏夹id,更新其中的指定废品id
   * @param id 
   * @param updateCollectionToGarbageDto 
   * @returns 
   */
  update(id:number,updateCollectionToGarbageDto:UpdateCollectionToGarbageDto){
    return this.collectionToGarbage.createQueryBuilder().update(CollectionToGarbage)
    .set(updateCollectionToGarbageDto).where('collection_to_garbage_id=:id',{id})
    .execute()
  }

  /**
   * 根据指定的收藏夹id,删除其中的指定废品id
   * @param collectionId 
   * @param garbageId 
   * @returns 
   */
  remove(collectionId: number, garbageId: number) {
    return this.collectionToGarbage.createQueryBuilder().delete().from(CollectionToGarbage)
      .where('collectionCollectionId=:collectionId', { collectionId })
      .andWhere('garbageGarbageId=:garbageId', { garbageId })
      .execute();
  }
}
