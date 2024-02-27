import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { Code } from './entities/code.entity';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CodeService {
  constructor(@InjectRepository(Code) private readonly code: Repository<Code>) { }

  /**
   * 创建最新code
   * @param createCodeDto 
   * @returns 
   */
  async create(createCodeDto: CreateCodeDto) {
    return this.code.createQueryBuilder().insert().into(Code).values(createCodeDto).execute();
  }

  /**
   * 删除比当前时间小的时间
   */
  async deleteExpiredCodes() {
    const currentDate = new Date();
    await this.code.delete({ codeTime: LessThan(currentDate) });
  }

  /**
   * 获取指定code 
   * 按最新时间获取
   * @param codeEmail 
   * @returns 
   */
  async findOneCode(codeEmail: string) {
    return this.code.createQueryBuilder().where('code_email=:codeEmail', { codeEmail })
      .andWhere('code_time > :currentDate', { currentDate: new Date() })
      .orderBy('code_time', 'DESC')
      .getOne();
  }
}
