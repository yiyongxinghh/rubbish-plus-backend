import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  /**
   * POST 创建分类
   * @param createCategoryDto 
   * @returns 
   */
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  /**
   * GET 获取所有分类，自带分页
   * @param query 
   * @returns 
   */
  @Get()
  async findAll(@Query() query: { page: number, pageSize: number }) {
    const { page, pageSize } = query
    const category = await this.categoryService.findAll(page, pageSize);
    const total = await this.categoryService.getTotal()
    return { category, total }
  }

  /**
   * GET 根据id获取指定分类
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  /**
   * PATCH 通过传递过来的对象更新指定分类
   * @param id 
   * @param updateCategoryDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  /**
   * DELETE 根据id移除指定分类
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  /**
   * POST 获取分类下所属的各个废品数量
   * @returns 
   */
  @Post('categoryCount')
  getCategoryCount() {
    return this.categoryService.getCategoryCount();
  }

  /**
   * DELETE 根据传递过来的id数组，平凉批量删除分类
   * @param body 
   * @returns 
   */
  @Delete('')
  deleteBatch(@Body() body: {ids: string[]}) {
    return this.categoryService.deleteBatch(body.ids);
  }
}
