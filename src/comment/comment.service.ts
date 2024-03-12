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
   * 获取所有评论，有分页操作
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findAll(page: number, pageSize: number) {
    if (page && pageSize) { return this.comment.createQueryBuilder().skip(pageSize * (page - 1)).take(pageSize).getMany(); }
    else { return this.comment.createQueryBuilder().getMany(); }
  }

  /**
   * 获取指定时间内的评论
   * @param start 
   * @param end 
   * @returns 
   */
  findTimed(start: Date, end: Date) {
    return this.comment.createQueryBuilder().where("comment_time >= :start AND comment_time <= :end", { start, end }).getMany();
  }

  /**
   * 根据评论id号来获取评论
   * @param id 
   * @returns 
   */
  findOne(id: number) {
    return this.comment.createQueryBuilder().where("comment.id = :id", { id }).getOne();
  }

  /**
   * 通过指定的用户id来获取其相关的评论，自带分页
   * @param page 
   * @param pageSize 
   * @param userId 
   * @returns 
   */
  findUserAll(page: number, pageSize: number, userId: number) {
    if (page && pageSize) {
      return this.comment.createQueryBuilder().skip(pageSize * (page - 1)).take(pageSize)
      .where("comment.user_id = :userId", { userId }).getMany();
    } else {
      return this.comment.createQueryBuilder().where("comment.user_id = :userId", { userId }).getMany();
    }
  }

  /**
   * 通过指定的评论id来修改评论主体
   * @param id 
   * @param updateCommentDto 
   * @returns 
   */
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.comment.createQueryBuilder().update(Comment).set(updateCommentDto).where("comment.id = :id", { id }).execute();
  }

  /**
   * 通过评论id来删除指定的评论主体
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.comment.createQueryBuilder().delete().from(Comment).where("comment.id = :id", { id }).execute();
  }

  /**
   * 获取评论表的总数量
   * @returns 
   */
  getTotal() {
    return this.comment.createQueryBuilder().getCount() // 获取总数量
  }
}
