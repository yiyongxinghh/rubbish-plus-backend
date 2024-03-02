import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionService {
  constructor(@InjectRepository(Collection) private readonly collection: Repository<Collection>){}

  /**
   * 创建一个收藏夹
   * @param createCollectionDto 
   * @returns 
   */
  create(createCollectionDto: CreateCollectionDto) {
    return this.collection.createQueryBuilder().insert().into(Collection).values(createCollectionDto).execute();
  }

  /**
   * 根据指定收藏夹名称获取指定收藏夹
   * @param collectionName 
   * @returns 
   */
  findNameOne(collectionName: string){
    return this.collection.createQueryBuilder().where('collection_name = :collectionName', { collectionName }).getOne();
  }

  /**
   * 根据用户id找到所有收藏夹
   * @param userId 
   * @returns 
   */
  findAll(userId: number) {
    return this.collection.createQueryBuilder().where('collection.user = :userId', { userId }).getMany();
  }

  /**
   * 移除指定id的收藏夹
   * @param collectionId 
   * @returns 
   */
  remove(collectionId: number) {
    return this.collection.createQueryBuilder().delete().from(Collection)
    .where("collection_id = :collectionId", { collectionId }).execute();
  }
}
