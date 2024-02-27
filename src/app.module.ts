import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/auth.guard';
import { MailService } from './service/mail-service';
import { CodeModule } from './code/code.module';
import { join } from 'path';
import { PicModule } from './pic/pic.module';
import { GarbageModule } from './garbage/garbage.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { PanelModule } from './panel/panel.module';
import { EventsModule } from './events/events.module';
import { MessageModule } from './message/message.module';
import { OrderModule } from './order/order.module';
import { OrderToGarbageModule } from './order-to-garbage/order-to-garbage.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql", //数据库类型
      username: "root", //账号
      password: "192007", //密码
      host: "localhost", //host
      // host: "107.191.60.197", //host
      port: 3306, //端口
      // port: 3307, 
      database: "rubbishPlus", //库名
      // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10,//重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      entities: [join(__dirname, '**', 'entities', '*.entity.{js,ts}')],
    }),
    UserModule,
    CodeModule,
    PicModule,
    GarbageModule,
    CategoryModule,
    CommentModule,
    PanelModule,
    EventsModule,
    MessageModule,
    OrderModule,
    OrderToGarbageModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, MailService,],
})
export class AppModule { }
