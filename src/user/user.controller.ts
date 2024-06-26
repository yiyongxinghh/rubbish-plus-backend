import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common'
import { salt } from '../common/password.salt'
import { JwtService } from '@nestjs/jwt';
import { Public } from '../common/public.decorator';
import * as bcrypt from 'bcrypt'
import * as randomstring from 'randomstring'
import { MailService } from 'src/service/mail-service';
import { CodeService } from 'src/code/code.service';

@Controller('user')
@UsePipes(new ValidationPipe({ skipMissingProperties: true }))
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService, private mailService: MailService, private codeService: CodeService) { }

  /**
   * POST 创建用户
   * @param createUserDto 
   * @returns 
   */
  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.userPass = await bcrypt.hash(createUserDto.userPass, salt.saltRounds);
    try {
      await this.userService.create(createUserDto);
      return { message: '注册成功' }
    } catch (error) {
      throw new HttpException({ message: `注册出现异常——${error.message}` }, 500)
    }
  }

  /**
   * GET 获取所有用户数据，自带分页
   * @param query 
   * @returns 
   */
  @Get()
  async findAll(@Query() query: any) {
    console.log(query);
    const { page, pageSize, userId } = query
    const total = await this.userService.getTotal();
    const users = await this.userService.findAll(page, pageSize, userId);
    return { total, users }
  }

  /**
   * GET 获取所有用户废品数据
   * @returns 
   */
  @Public()
  @Get('getUserGarbage')
  getUserGarbgae(){
    return this.userService.getUserGarbgae();
  }

  /**
   * GET 获取指定id的用户数据
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /**
   * PATCH 修改指定id的用户数据
   * 可以通过指定字段做单一修改
   * @param id 
   * @param updateUserDto 
   * @param field 
   * @returns 
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body('user') updateUserDto: UpdateUserDto, @Body('field') field?: string) {
    if (field) {
      await this.userService.update(+id, updateUserDto, field)
      return { message: '修改成功' }
    } else {
      updateUserDto.userPass = await bcrypt.hash(updateUserDto.userPass, salt.saltRounds);
      try {
        await this.userService.update(+id, updateUserDto)
        return { message: '修改成功' }
      } catch (error) {
        throw new HttpException({ message: `修改出现异常——${error.message}` }, 500)
      }
    }

  }

  /**
   * DELETE 删除指定id的用户数据
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /**
   * POST 用户登录
   * @param createUserDto 
   * @returns 
   */
  @Post('login')
  @Public()
  async login(@Body() createUserDto: CreateUserDto) {
    const { userEmail, userPass } = createUserDto
    const user = await this.userService.findUserEmail(userEmail);
    if (!user) throw new HttpException({ isLogin: false, message: '此用户不存在' }, 404)
    if (await bcrypt.compare(userPass, user.userPass)) {
      return { isLogin: true, message: '登录成功', access_token: await this.jwtService.signAsync(createUserDto), user }
    } else {
      return { isLogin: false, message: '密码错误' }
    }
  }

  /**
   * POST 用户登验证码录
   * @param userEmail 
   * @param codeVerification 
   * @returns 
   */
  @Post('codeLogin')
  @Public()
  async codeLogin(@Body('userEmail') userEmail: string, @Body('codeVerification') codeVerification: string) {
    const user = await this.userService.findUserEmail(userEmail);
    if (!user) throw new HttpException({ isLogin: false, message: '此用户不存在' }, 404)
    const code = await this.codeService.findOneCode(userEmail)
    if (!code) {
      return { isLogin: false, message: '验证码过期' }
    } else if (code.codeVerification === codeVerification) {
      return { isLogin: true, message: '登录成功', access_token: await this.jwtService.signAsync({ userEmail, codeVerification }), user }
    } else {
      return { isLogin: false, message: '验证码错误' }
    }
  }

  /**
   * POST 发送验证码
   * @param userEmail 
   * @returns 
   */
  @Post('email')
  @Public()
  async email(@Body('userEmail') userEmail: string) {
    let codeVerification: string = randomstring.generate(6)
    const currentTime = new Date();
    const codeTime = new Date(currentTime.getTime() + (5 * 60 * 1000)); // 设置验证码有效期为5分钟
    const user = await this.userService.findUserEmail(userEmail)
    await this.codeService.create({ codeVerification, codeTime, codeEmail: userEmail, user })
    if (user) {
      await this.mailService.sendVerificationCode(userEmail, codeVerification)
      return { message: '验证码已发送' }
    } else {
      throw new HttpException({ message: '此用户不存在' }, 404)
    }
  }

  /**
   * DELETE 批量删除
   * @param ids 
   * @returns 
   */
  @Delete('')
  removeBatch(@Body('ids') ids: string[]) {
    return this.userService.deleteBatch(ids);
  }

  /**
   * POST 修改指定id的用户数据
   * @param updateData 
   * @returns 
   */
  @Post('updateOne')
  async updateOne(@Body('updateData') updateData: { data: string, userId: number, type: string, userOldPass?: string }) {
    console.log(updateData);
    const user = await this.userService.findOne(updateData.userId);
    switch (updateData.type) {
      case 'userPass':
        if (await bcrypt.compare(updateData.userOldPass, user.userPass)) {
          updateData.data = await bcrypt.hash(updateData.data, salt.saltRounds);
          await this.userService.updateUserOne(updateData.type, updateData.data, updateData.userId)
          return { message: '修改成功', isUpdata: true }
        } else {
          return { message: '原密码错误', isUpdata: false }
        }
      default:
        await this.userService.updateUserOne(updateData.type, updateData.data, updateData.userId)
        return { message: '修改成功', isUpdata: true }
    }
  }

  /**
   * POST 获取分级用户数据
   * @returns 
   */
  @Post('groupUser')
  async groupUser() {
    const group = await this.userService.groupByUser()
    const total = await this.userService.getTotal();
    return { group, total }
  }

}
