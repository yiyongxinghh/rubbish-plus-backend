import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GarbageService } from './garbage.service';
import { CreateGarbageDto } from './dto/create-garbage.dto';
import { UpdateGarbageDto } from './dto/update-garbage.dto';
import { OrderToGarbageService } from 'src/order-to-garbage/order-to-garbage.service';
import * as dayjs from 'dayjs'
import { Public } from 'src/common/public.decorator';

@Controller('garbage')
export class GarbageController {
  constructor(private readonly garbageService: GarbageService,
    private readonly orderToGarbageService: OrderToGarbageService,) { }

  /**
   * POST 创建废品
   * @param createGarbageDto 
   * @returns 
   */
  @Post()
  create(@Body() createGarbageDto: CreateGarbageDto) {
    console.log(createGarbageDto);
    return this.garbageService.create(createGarbageDto);
  }

  /**
   * GET 获取所有废品，自带分页
   * @param query 
   * @returns 
   */
  @Public()
  @Get()
  async findAll(@Query() query: { page: number, pageSize: number }) {
    const { page, pageSize } = query
    const total = await this.garbageService.getTotal();
    const garbages = await this.garbageService.findAll(page, pageSize);
    return { total, garbages }
  }

  /**
   * GET 根据具体分类获取该类的所有废品
   * @param id 
   * @returns 
   */
  @Public()
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
  @Public()
  @Get('soldOut')
  async getSoldOutGarbage() {
    const garbages = await this.garbageService.getSoldOutGarbage();
    return garbages.slice(0, 8)
  }

  /**
   * GET 获取指定废品
   * @param id 
   * @returns 
   */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.garbageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGarbageDto: UpdateGarbageDto) {
    return this.garbageService.update(+id, updateGarbageDto);
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
   * POST 获取所有废品销量
   * @returns 
   */
  @Post('findAllGarbageQuantity')
  findAllGarbageQuantity() {
    return this.garbageService.findAllGarbageQuantity();
  }

  /**
   * POST 根据指定id获取指定废品销量
   * @returns 
   */
  @Post('findOneGarbageQuantity/:id')
  async findOneGarbageQuantity(@Param('id') id: number) {
    const data = await this.garbageService.findOneGarbageQuantity(id);
    data.orderToGarbage.sort((a, b) => {
      // 将日期字符串解析为 Day.js 对象
      const dateA = dayjs(a.order.orderDate);
      const dateB = dayjs(b.order.orderDate);
      // 比较日期对象的时间戳
      return dateA.valueOf() - dateB.valueOf();
    });
    // 创建一个空对象来跟踪每一天的总数量
    const mergedData = {};

    // 遍历原始数组，并根据日期合并数据
    data.orderToGarbage.forEach(element => {
      const currentDate = dayjs(element.order.orderDate).format('YYYY-MM-DD');

      if (mergedData[currentDate]) {
        // 如果当前日期已经存在于对象中，则将当前元素的数量添加到现有的数量上
        mergedData[currentDate] += element.garbageQuantity;
      } else {
        // 如果当前日期不存在于对象中，则将当前日期作为键，当前元素的数量作为值添加到对象中
        mergedData[currentDate] = element.garbageQuantity;
      }
    });

    // 将对象的值转换为数组形式
    const mergedArray = Object.keys(mergedData).map(date => ({
      currentDate: date,
      garbageQuantity: mergedData[date]
    }));

    // 将处理后的数组赋值回原始数组
    data.orderToGarbage = mergedArray as any;

    return data
  }

  /**
   * POST 获取热门废品
   * @returns 
   */
  @Public()
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
