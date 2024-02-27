import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class DataInterceptor<T> implements NestInterceptor<T,ResponseData<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseData<T>> {
    return next.handle().pipe(map(data => ({data,code:200,message:'请求成功'})));
  }
}
