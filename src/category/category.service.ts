import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private category: Repository<Category>) { }

  create(createCategoryDto: CreateCategoryDto) {

    return this.category.createQueryBuilder().insert().into(Category).values(createCategoryDto).execute();
  }

  findAll(page: number, pageSize: number) {
    if (page && pageSize) {
      return this.category.createQueryBuilder().skip((page - 1) * pageSize).take(pageSize).getMany();
    } else {
      return this.category.createQueryBuilder().getMany();
    }
  }

  findOne(id: number) {
    return this.category.createQueryBuilder().where("category_id = :id", { id }).getOne();
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.category.createQueryBuilder().update(Category).set(updateCategoryDto).where("category_id = :id", { id }).execute();
  }

  remove(id: number) {
    return this.category.createQueryBuilder().delete().from(Category).where("category_id = :id", { id }).execute();
  }

  getCategoryCount() {
    return this.category.createQueryBuilder("category")
      .leftJoinAndSelect("category.garbages", "garbage")
      .groupBy("category.categoryName")
      .select("category.categoryName", "categoryName")
      .addSelect("SUM(garbage.garbageAmount)", "count")
      .getRawMany()
  }

  /**
   * 根据传递过来的id数组，批量删除分类
   * @param ids 
   * @returns 
   */
  deleteBatch(ids: string[]) {
    return this.category.createQueryBuilder().delete().from(Category).where("category_id in (:...ids)", {
      ids: ids
    }).execute(); // 注意这里的语法
  }

  /**
 * 查询总数
 * @returns 
 */
  getTotal() {
    return this.category.createQueryBuilder().getCount();
  }
}
