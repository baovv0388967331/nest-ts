import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ResponseInterceptor } from 'core/interceptor/response.interceptor';

@UseInterceptors(ResponseInterceptor)
export class BaseController {
  public dataType<TRes>(type: ClassConstructor<TRes>, data?: TRes) {
    if (!data) {
      return {};
    }

    return plainToInstance(type, data, {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      enableImplicitConversion: true,
    });
  }
}
