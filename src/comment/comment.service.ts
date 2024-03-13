import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly comment: Repository<Comment>) { }

  /**
   * 创建评论
   * @param createCommentDto 
   * @returns 
   */
  create(createCommentDto: CreateCommentDto) {
    return this.comment.createQueryBuilder().insert().into(Comment).values(createCommentDto).execute();
  }

  /**
   * 获取所有评论，自带分页
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findAll(page: number, pageSize: number) {
    if (page && pageSize) { return this.comment.createQueryBuilder().skip(pageSize * (page - 1)).take(pageSize).getMany(); }
    else { return this.comment.createQueryBuilder().getMany(); }
  }

  /**
   * 获取最热评论，自带分页
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findHotAll(page: number, pageSize: number, id: number) {
    if (page && pageSize) { return this.comment.createQueryBuilder().skip(pageSize * (page - 1)).take(pageSize).where('garbage_id = :id', { id }).orderBy('comment_score', 'DESC').getMany(); }
    else { return this.comment.createQueryBuilder().where('garbage_id = :id', { id }).orderBy('comment_score', 'DESC').getMany(); }
  }

  /**
   * 获取最新评论，自带分页
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findNewAll(page: number, pageSize: number, id: number) {
    if (page && pageSize) { return this.comment.createQueryBuilder().skip(pageSize * (page - 1)).take(pageSize).where('garbage_id = :id', { id }).orderBy('comment_time', 'DESC').getMany(); }
    else { return this.comment.createQueryBuilder().where('garbage_id = :id', { id }).orderBy('comment_time', 'DESC').getMany(); }
  }

  /**
   * 根据起始时间范围，获取区间所有评论
   * @param start 
   * @param end 
   * @returns 
   */
  findTimed(start: Date, end: Date) {
    return this.comment.createQueryBuilder().where("comment_time >= :start AND comment_time <= :end", { start, end }).getMany();
  }

  /**
   * 根据指定id获取指定评论
   * @param id 
   * @returns 
   */
  findOne(id: number) {
    return this.comment.createQueryBuilder().where("comment.id = :id", { id }).getOne();
  }

  /**
   * 根据指定id更新指定评论
   * @param id 
   * @param updateCommentDto 
   * @returns 
   */
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.comment.createQueryBuilder().update(Comment).set(updateCommentDto).where("comment.id = :id", { id }).execute();
  }

  /**
   * 根据指定id移除指定评论
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.comment.createQueryBuilder().delete().from(Comment).where("comment.id = :id", { id }).execute();
  }

  /**
   * 获取评论表总数，可携带id
   * @param id 
   * @returns 
   */
  getTotal(id?: number) {
    if (id) { 
      return this.comment.createQueryBuilder().where('garbage_id = :id', { id }).getCount()
    }
    else {
      return this.comment.createQueryBuilder().getCount() // 获取总数量
    }
  }
}
