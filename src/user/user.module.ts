import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/service/mail-service'; 
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: '老子的密钥',
      signOptions: { expiresIn: '24h' },
    }),
    CodeModule
  ],
  controllers: [UserController],
  providers: [UserService,MailService],
  exports: [UserService]
})
export class UserModule { }
