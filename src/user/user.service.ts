import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }

  /**
   * 创建用户
   * @param createUserDto 
   */
  async create(createUserDto: CreateUserDto) {
    const { userName, userEmail, userPhone } = createUserDto;

    const entityManager = this.user.manager;

    await entityManager.transaction(async (transactionalEntityManager) => {
      // 检查用户名是否唯一
      const existingUserName = await transactionalEntityManager.createQueryBuilder(User, 'user')
        .where("user.user_name = :userName", { userName })
        .getOne();
      if (existingUserName) {
        throw new Error('用户名已存在');
      }

      // 检查邮箱是否唯一
      const existingUserEmail = await transactionalEntityManager.createQueryBuilder(User, 'user')
        .where("user.user_email = :userEmail", { userEmail })
        .getOne();
      if (existingUserEmail) {
        throw new Error('邮箱已存在');
      }

      // 检查手机是否唯一
      const existingUserPhone = await transactionalEntityManager.createQueryBuilder(User, 'user')
        .where("user.user_phone = :userPhone", { userPhone })
        .getOne();
      if (existingUserPhone) {
        throw new Error('手机号已存在');
      }

      // 创建用户
      const newUser = this.user.create(createUserDto);
      await transactionalEntityManager.save(newUser);
    });

    // return this.user.createQueryBuilder().insert().into(User).values(createUserDto).execute();
  }

  /**
   * 查询所有用户，自带分页
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findAll(page: number, pageSize: number, id: number) {
    if (page && pageSize) {
      return this.user.createQueryBuilder('user').skip((page - 1) * pageSize)
        .where('user_id <> :id', { id })
        .take(pageSize).getMany();
    } else {
      return this.user.createQueryBuilder('user')
      .leftJoinAndSelect('user.pic', 'pic')
      .getMany();
    }
  }

  /**
   * 根据id查询用户
   * @param id 
   * @returns 
   */
  findOne(id: number) {
    return this.user.createQueryBuilder("user")
    .leftJoinAndSelect("user.pic", "pic")
    .where("user_id = :id", { id }).getOne();
  }

  /**
   * 更新用户信息
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  update(id: number, updateUserDto: UpdateUserDto, field?: string) {
    if (field) {
      const updateField = { [field]: updateUserDto[field] };
      return this.user.createQueryBuilder().update(User).set(updateField)
          .where("user_id = :id", { id }).execute();
    } else {
      return this.user.createQueryBuilder().update(User).set(updateUserDto).where("user_id = :id", { id }).execute();
    }
  }

  /**
   * 删除用户
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.user.createQueryBuilder().delete().from(User).where("user_id = :id", { id }).execute();
  }

  /**
   * 根据用户名查询一名用户
   * @param userName 
   * @returns 
   */
  findUserName(userName: string) {
    return this.user.createQueryBuilder().where("user_name = :userName", { userName }).getOne();
  }

  /**
   * 根据邮箱查询一名用户
   * @param userEmail 
   * @returns 
   */
  findUserEmail(userEmail: string) {
    return this.user.createQueryBuilder("user")
      .leftJoinAndSelect("user.pic", "pic")
      .where("user_email = :userEmail", { userEmail }).getOne();
  }

  /**
   * 根据手机号查询一名用户
   * @param userPhone 
   * @returns 
   */
  findUserPhone(userPhone: string) {
    return this.user.createQueryBuilder().where("user_phone = :userPhone", { userPhone }).getOne();
  }

  /**
   * 查询用户总数
   * @returns 
   */
  getTotal() {
    return this.user.createQueryBuilder().getCount();
  }

  /**
   * 根据传递过来的id数组，批量删除用户
   * @param ids 
   * @returns 
   */
  deleteBatch(ids: string[]) {
    return this.user.createQueryBuilder().delete().from(User).where("user_id in (:...ids)", {
      ids: ids
    }).execute(); // 注意这里的语法
  }


  /**
   * 根据传递过来的类型和用户id，判断修改的目标，并进行单一修改
   * @param type 
   * @param value 
   * @param id 
   */
  updateUserOne(type: string, value: string, id: number) {
    switch (type) {
      case 'userName':
        return this.user.createQueryBuilder().update(User).set({ userName: value }).where("user_id = :id", { id }).execute();
      case 'userPass':
        return this.user.createQueryBuilder().update(User).set({ userPass: value }).where("user_id = :id", { id }).execute();
      case 'userEmail':
        return this.user.createQueryBuilder().update(User).set({ userEmail: value }).where("user_id = :id", { id }).execute();
      case 'userPhone':
        return this.user.createQueryBuilder().update(User).set({ userPhone: value }).where("user_id = :id", { id }).execute();
    }
  }

  /**
   * 对用户分级进行分组
   */
  groupByUser() {
    return this.user.createQueryBuilder().select('user_rank', 'userRank').addSelect('COUNT(*)', 'count').groupBy("user_rank").getRawMany();
  }

  /**
   * 获取用户和垃圾的关联表
   * @returns 
   */
  getUserGarbgae(){
    return this.user.createQueryBuilder('user')
      .leftJoinAndSelect('user.pic', 'pic')
      .leftJoinAndSelect('user.garbages', 'garbages')
      .leftJoinAndSelect('garbages.pic', 'garbagesPic')
      .getMany()
  }
}
