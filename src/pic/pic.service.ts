import { Injectable } from '@nestjs/common';
import { CreatePicDto } from './dto/create-pic.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Pic } from './entities/pic.entity';
import { Repository } from 'typeorm';
import { UpdatePicDto } from './dto/update-pic.dto';

@Injectable()
export class PicService {
  constructor(@InjectRepository(Pic) private readonly pic: Repository<Pic>) { }

  /**
   * 创建图片
   * @param createPicDto 
   * @returns 
   */
  async create(createPicDto: CreatePicDto) {
    return this.pic.createQueryBuilder().insert().into(Pic).values(createPicDto).execute();
  }

  /**
   * 获取所有图片，自带分页
   * @param page 
   * @param pageSize 
   * @returns 
   */
  async findAll(page, pageSize) {
    if (page && pageSize) {
      return this.pic.createQueryBuilder().skip((page - 1) * pageSize).take(pageSize).getMany();
    } else {
      return this.pic.createQueryBuilder().getMany();
    }
  }

  /**
   * 根据指定id查询图片
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return this.pic.createQueryBuilder().where("pic_id = :id", { id }).getOne();
  }

  /**
   * 根据指定id移除图片
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    return this.pic.createQueryBuilder().delete().from(Pic).where("pic_id=:id", { id }).execute()
  }

  /**
   * 根据指定id更新图片
   * @param id 
   * @param updatePicDto 
   * @returns 
   */
  update(id: number, updatePicDto: UpdatePicDto) {
    return this.pic.createQueryBuilder().update(Pic).set(updatePicDto).where("pic_id=:id", { id }).execute()
  }

  /**
   * 获取图片系列总数量
   * @returns 
   */
  getTotal() {
    return this.pic.createQueryBuilder().getCount() // 获取总数量
  }
}
