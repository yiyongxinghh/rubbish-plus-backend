import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * 创建评论
   * @param createCommentDto 
   * @returns 
   */
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  /**
   * 获取所有评论，自带分页
   * @param query 
   * @returns 
   */
  @Get()
  async findAll(@Query() query: { page: number,pageSize: number }) {
    const { page, pageSize } = query
    const comments = await this.commentService.findAll(page, pageSize);
    const total = await this.commentService.getTotal()
    return {comments,total}
  }


  /**
   * 通过指定的用户id来获取其相关的评论，自带分页
   * @param query 
   * @returns 
   */
  @Get('user')
  async findUserAll(@Query() query: { page: number,pageSize: number,userId:number }) {
    const { page, pageSize,userId } = query
    const comments = await this.commentService.findUserAll(page, pageSize,userId);
    const total = await this.commentService.getTotal()
    return {comments,total}
  }


  /**
   * 获取指定时间内的评论
   * @param date 
   * @returns 
   */
  @Post('time')
  findTimed(@Body() date: { start: Date, end: Date }) {
    const { start, end } = date
    return this.commentService.findTimed(start, end);
  }

  /**
   * 根据评论id号来获取评论
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  /**
   * 通过指定的评论id来修改评论主体
   * @param id 
   * @param updateCommentDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  /**
   * 通过评论id来删除指定的评论主体
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
