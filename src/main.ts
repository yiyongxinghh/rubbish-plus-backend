import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter'
import { DataInterceptor } from './common/data.interceptor'
import { NestExpressApplication } from "@nestjs/platform-express"
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors:{
      origin:"*",
      methods:["GET","POST","DELETE","PATCH"],
    }
  });
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DataInterceptor())

  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: "/files/"
  })

  // 配置静态文件访问目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/files/'
  })


  await app.listen(3000);
}
bootstrap();
