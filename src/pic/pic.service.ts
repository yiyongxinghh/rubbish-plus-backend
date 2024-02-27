import { Injectable } from '@nestjs/common';
import { CreatePicDto } from './dto/create-pic.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Pic } from './entities/pic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PicService {
  constructor(@InjectRepository(Pic) private readonly pic: Repository<Pic>) { }

  async create(createPicDto: CreatePicDto) {
    return this.pic.createQueryBuilder().insert().into(Pic).values(createPicDto).execute();
  }

  async findAll(page, pageSize) {
    if (page && pageSize) {
      return this.pic.createQueryBuilder().skip((page - 1) * pageSize).take(pageSize).getMany();
    } else {
      return this.pic.createQueryBuilder().getMany();
    }
  }

  async findOne(id: number) {
    return this.pic.createQueryBuilder().where("pic_id = :id", { id }).getOne();
  }

  async remove(id: number) {
    return this.pic.createQueryBuilder().delete().from(Pic).where("pic_id=:id", { id }).execute()
  }

  getTotal(){
    return this.pic.createQueryBuilder().getCount() // 获取总数量
  }
}
