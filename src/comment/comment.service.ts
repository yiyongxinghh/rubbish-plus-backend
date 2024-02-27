import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly comment: Repository<Comment>) { }

  create(createCommentDto: CreateCommentDto) {
    return this.comment.createQueryBuilder().insert().into(Comment).values(createCommentDto).execute();
  }

  findAll(page: number, pageSize: number) {
    if (page && pageSize) { return this.comment.createQueryBuilder().skip(pageSize * (page - 1)).take(pageSize).getMany(); }
    else { return this.comment.createQueryBuilder().getMany(); }
  }

  findTimed(start: Date, end: Date) {
    return this.comment.createQueryBuilder().where("comment_time >= :start AND comment_time <= :end", { start, end }).getMany();
  }

  findOne(id: number) {
    return this.comment.createQueryBuilder().where("comment.id = :id", { id }).getOne();
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.comment.createQueryBuilder().update(Comment).set(updateCommentDto).where("comment.id = :id", { id }).execute();
  }

  remove(id: number) {
    return this.comment.createQueryBuilder().delete().from(Comment).where("comment.id = :id", { id }).execute();
  }

  getTotal() {
    return this.comment.createQueryBuilder().getCount() // 获取总数量
  }
}
