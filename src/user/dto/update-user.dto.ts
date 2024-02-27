import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsInt,IsCurrency} from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsInt()
    userRank: number

    @IsCurrency()
    userAmount: number
}
