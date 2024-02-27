import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GarbageService } from './garbage.service';
import { CreateGarbageDto } from './dto/create-garbage.dto';
import { UpdateGarbageDto } from './dto/update-garbage.dto';
import { OrderToGarbageService } from 'src/order-to-garbage/order-to-garbage.service';

@Controller('garbage')
export class GarbageController {
  constructor(private readonly garbageService: GarbageService,
    private readonly orderToGarbageService: OrderToGarbageService,) { }

  @Post()
  create(@Body() createGarbageDto: CreateGarbageDto) {
    console.log(createGarbageDto);
    return this.garbageService.create(createGarbageDto);
  }

  @Get()
  async findAll(@Query() query: { page: number, pageSize: number }) {
    const { page, pageSize } = query
    const total = await this.garbageService.getTotal();
    const garbages = await this.garbageService.findAll(page, pageSize);
    return { total, garbages }
  }

  @Get('getTypeGarbage')
  async getTypeGarbage(@Query('id') id: number) {
    const rawGarbages = await this.garbageService.getTypeGarbage(id);
    const garbages = {};
    rawGarbages.forEach((item) => {
      if (!garbages[item.garbageType]) {
        garbages[item.garbageType] = [];
      }
      garbages[item.garbageType].push(item);
    })
    const groupedArray = Object.values(garbages);
    return groupedArray;
  }

  /**
 * 获取即将售空废品
 * @returns 
 */
  @Get('soldOut')
  async getSoldOutGarbage() {
    const garbages = await this.garbageService.getSoldOutGarbage();
    return garbages.slice(0, 8)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.garbageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGarbageDto: UpdateGarbageDto) {
    return this.garbageService.update(+id, updateGarbageDto);
  }

  @Patch(':id')
  updateBatch(@Body() updateGarbageDtos: UpdateGarbageDto[]) {
    return this.garbageService.updateBatch(updateGarbageDtos);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.garbageService.remove(+id);
  }

  /**
   * 依次删除所有相关订单和相关废品
   * @param ids 
   */
  @Delete('')
  async removeBatch(@Body('ids') ids: string[]) {
    await this.orderToGarbageService.deleteIds(ids)
    await this.garbageService.deleteBatch(ids);
  }

  /**
   * 判断垃圾是否存在订单
   * @param ids 
   * @returns 
   */
  @Post('findorderToGarbage')
  async findorderToGarbage(@Body('ids') ids: string[]) {
    const orderToGarbage = await this.orderToGarbageService.findIds(ids)
    if (orderToGarbage.length > 0) {
      return { message: '该垃圾存在订单,是否要强制删除,确定后将删除所有相关的废品和订单,这可能会造成不可逆的结果!' }
    } else if (orderToGarbage.length == 0) {
      return { message: '该垃圾不存在订单,可以删除' }
    }
  }

  /**
   * 获取所有废品销量
   * @returns 
   */
  @Post('findAllGarbageQuantity')
  findAllGarbageQuantity() {
    return this.garbageService.findAllGarbageQuantity();
  }

  /**
   * 获取热门废品
   * @returns 
   */
  @Post('hot')
  async findHotGarbageQuantity() {
    const garbages = await this.garbageService.getHotGarbage();
    return garbages.slice(0, 8).reduce((result, current, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);;
  }


  /**
   * 根据具体分类分组
   * @returns 
   */
  @Post('groupByGarbage')
  groupByGarbage() {
    return this.garbageService.groupByGarbage();
  }

}
