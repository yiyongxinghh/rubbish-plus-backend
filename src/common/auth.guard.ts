import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator'
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {

    // 实例化 jwtService
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    // 验证token
    async canActivate(context: ExecutionContext,): Promise<boolean> {

        // 获取请求
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        // 获取请求的内容
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.log("token 验证没有通过")
            throw new UnauthorizedException();
        }
        try {
            // 生成token 通过 jwtService.verifyAsync 
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: '老子的密钥'
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            // console.log(payload)
        } catch {
            throw new UnauthorizedException();
        }

        console.log("token 验证通过啦")
        return true;
    }

    // 通过 请求头拿到 token
    private extractTokenFromHeader(request: Request): string | undefined {

        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        // return token
        return type === 'Bearer' ? token : undefined;
    }

}