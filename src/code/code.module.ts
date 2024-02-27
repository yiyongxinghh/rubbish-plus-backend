import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { Code } from './entities/code.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CodeExpirationTask } from './code-expiration.task';

@Module({
  imports: [TypeOrmModule.forFeature([Code]),ScheduleModule.forRoot(),],
  controllers: [CodeController],
  providers: [CodeService,CodeExpirationTask],
  exports: [CodeService]
})
export class CodeModule { }
