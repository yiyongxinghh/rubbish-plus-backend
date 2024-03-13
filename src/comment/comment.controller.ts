import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  /**
   * POST 创建评论
   * @param createCommentDto 
   * @returns 
   */
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  /**
   * GET 获取所有评论，自带分页
   * @param query 
   * @returns 
   */
  @Get()
  async findAll(@Query() query: { page: number, pageSize: number }) {
    const { page, pageSize } = query
    const comments = await this.commentService.findAll(page, pageSize);
    const total = await this.commentService.getTotal()
    return { comments, total }
  }

  /**
   * 
   * @param query 
   * @returns 
   */
  @Get('/hot')
  async findHotAll(@Query() query: { page: number, pageSize: number, id: number }) {
    const { page, pageSize, id } = query
    const comments = await this.commentService.findHotAll(page, pageSize, id);
    const total = await this.commentService.getTotal(id)
    return { comments, total }
  }

  /**
   * 
   * @param query 
   * @returns 
   */
  @Get('/new')
  async findNewAll(@Query() query: { page: number, pageSize: number, id: number }) {
    const { page, pageSize, id } = query
    const comments = await this.commentService.findNewAll(page, pageSize, id);
    const total = await this.commentService.getTotal(id)
    return { comments, total }
  }



  /**
   * POST 根据起始时间范围，获取区间所有评论
   * @param date 
   * @returns 
   */
  @Post('time')
  findTimed(@Body() date: { start: Date, end: Date }) {
    const { start, end } = date
    return this.commentService.findTimed(start, end);
  }

  /**
   * GET 根据指定id获取指定评论
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  /**
   * PATCH 根据指定id更新指定评论
   * @param id 
   * @param updateCommentDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  /**
   * DELETE 根据指定id移除指定评论
   * @param id 
   * @param updateCommentDto 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
