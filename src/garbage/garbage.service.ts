import { Injectable } from '@nestjs/common';
import { CreateGarbageDto } from './dto/create-garbage.dto';
import { UpdateGarbageDto } from './dto/update-garbage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Garbage } from './entities/garbage.entity';
import { Repository } from 'typeorm';


@Injectable()
export class GarbageService {
  constructor(@InjectRepository(Garbage) private readonly garbage: Repository<Garbage>,) { }

  /**
   * 创建废品
   * @param createGarbageDto 
   * @returns 
   */
  create(createGarbageDto: CreateGarbageDto) {
    return this.garbage.createQueryBuilder().insert().into(Garbage).values(createGarbageDto).execute();
  }

  /**
   * 获取废品，自带分页
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findAll(page?: number, pageSize?: number) {
    if (page && pageSize) {
      return this.garbage.createQueryBuilder('garbage')
        .leftJoinAndSelect('garbage.user', 'user')
        .leftJoinAndSelect('user.pic', 'userPic')
        .leftJoinAndSelect('garbage.pic', 'garbagePic')
        .leftJoinAndSelect('garbage.category', 'category')
        .leftJoinAndSelect('garbage.comments', 'comments')
        .skip((page - 1) * pageSize).take(pageSize).getMany();
    } else {
      return this.garbage.createQueryBuilder('garbage')
        .leftJoinAndSelect('garbage.user', 'user')
        .leftJoinAndSelect('user.pic', 'userPic')
        .leftJoinAndSelect('garbage.pic', 'garbagePic')
        .leftJoinAndSelect('garbage.category', 'category')
        .leftJoinAndSelect('garbage.comments', 'comments')
        .orderBy('garbage.garbageAmount', 'ASC')
        .getMany();
    }

  }

  /**
   * 根据指定id获取指定废品
   * @param id 
   * @returns 
   */
  findOne(id: number) {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.user', 'user')
      .leftJoinAndSelect('garbage.pic', 'garbagePic')
      .leftJoinAndSelect('garbage.category', 'category')
      .where("garbage_id = :id", { id }).getOne();
  }

  /**
   * 通过指定id更新指定废品
   * @param id 
   * @param updateGarbageDto 
   * @returns 
   */
  update(id: number, updateGarbageDto: UpdateGarbageDto) {
    return this.garbage.createQueryBuilder().update(Garbage).set(updateGarbageDto).where("garbage_id = :id", { id }).execute();
  }

  /**
   * 根据指定id移除指定废品
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.garbage.createQueryBuilder().delete().from(Garbage).where("garbage_id = :id", { id }).execute();
  }

  /**
   * 根据指定的id数组批量移除废品
   * @param ids 
   * @returns 
   */
  deleteBatch(ids: string[]) {
    return this.garbage.createQueryBuilder().delete().from(Garbage).where("garbage_id in (:...ids)", {
      ids: ids
    }).execute(); // 注意这里的语法
  }

  /**
   * 获取废品系列总数量
   * @returns 
   */
  getTotal() {
    return this.garbage.createQueryBuilder().getCount() 
  }

  /**
   * 根据指定id获取指定废品销量
   * @param id 
   * @returns 
   */
  findOneGarbageQuantity(id: number) {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.orderToGarbage', 'orderToGarbage')
      .leftJoinAndSelect('orderToGarbage.order', 'order')
      .leftJoinAndSelect('garbage.pic', 'pic')
      .where("garbage_id = :id", { id })
      .getOne();
  }

  /**
   * 获取所有废品销量
   * @returns 
   */
  findAllGarbageQuantity() {
    return this.garbage.createQueryBuilder('garbage')
      .innerJoinAndSelect('garbage.orderToGarbage', 'orderToGarbage')
      .leftJoinAndSelect('garbage.pic', 'pic')
      .select([
        'garbage.garbageId AS garbageId',
        'garbage.garbageName AS garbageName',
        'garbage.garbageType AS garbageType',
        'garbage.garbageAmount AS garbageAmount',
        'garbage.garbagePrice AS garbagePrice',
        'garbage.garbageScore AS garbageScore',
        'garbage.garbageDescription AS garbageDescription',
      ])
      .addSelect('SUM(orderToGarbage.garbageQuantity)', 'totalQuantity')
      .addSelect('pic.picUrl', 'picUrl')
      .groupBy('garbage.garbageId')
      .orderBy('totalQuantity', 'ASC')
      .getRawMany();
  }

  /**
   * 根据具体分类分组
   * @returns 
   */
  groupByGarbage() {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.category', 'category')
      .select([
        'category.categoryName AS categoryName',
        'SUM(garbage.garbageAmount) AS garbageAmount'
      ])
      .groupBy('garbage.category').getRawMany();
  }

  /**
   * 获取热门废品
   * @returns 
   */
  getHotGarbage() {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.pic', 'pic')
      .orderBy('garbage.garbageScore', 'DESC')
      .getMany()
  }

  /**
   * 获取热门废品
   * @returns 
   */
  getSoldOutGarbage() {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.pic', 'pic')
      .orderBy('garbage.garbageAmount', 'ASC')
      .getMany()
  }

  /**
   * 获取指定分类的所有统一类型废品
   * @param id 
   * @returns 
   */
  getTypeGarbage(id: number) {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.pic', 'garbagePic')
      .where('garbage.category = :id', { id })
      .getMany()
  }

  /**
   * 模糊查询
   * @param name 
   * @returns 
   */
  getNameGarbage(name: string) {
    return this.garbage.createQueryBuilder('garbage')
      .leftJoinAndSelect('garbage.pic', 'garbagePic')
      .where('garbage.garbageName LIKE :name', { name: `%${name}%` })
      .getMany();
  }
  
}
