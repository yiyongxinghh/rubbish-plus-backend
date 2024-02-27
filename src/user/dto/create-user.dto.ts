import { IsEmail, Length, IsMobilePhone, ValidationArguments } from 'class-validator'

export class CreateUserDto{

    userId: number

    @Length(5, 10, {
        message: (args: ValidationArguments) => {
            if (args.value.length < 5) return `${args.value} name too short`
            else if (args.value.length > 10) return `${args.value} name too long`
        }
    })
    userName: string

    @Length(5, 10, {
        message: (args: ValidationArguments) => {
            if (args.value.length < 5) return `${args.value} password too short`
            else if (args.value.length > 10) return `${args.value} password too long`
        }
    })
    userPass: string

    @IsMobilePhone('zh-CN', {}, { message: (args: ValidationArguments) => `${args.value} not a phone` })
    userPhone: string

    @IsEmail({}, { message: (args: ValidationArguments) => `${args.value} not an email` })
    userEmail: string

    userAddress: string
}
