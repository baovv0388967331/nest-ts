import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MessageCode } from 'common/constants/messageCode';
import { ExposeApiProperty } from 'core/decorator/common/property.decorator';

export abstract class NumericIdResponse {
  @ExposeApiProperty()
  id: number;
}

export abstract class StringIdResponse {
  @ExposeApiProperty()
  id: string;
}

export class HttpResponse<T> {
  @ApiPropertyOptional()
  statusCode?: number;

  @ApiPropertyOptional()
  messageCode?: MessageCode;

  @ApiPropertyOptional()
  message?: string;

  @ApiPropertyOptional({ type: Object })
  data?: T;

  @ApiPropertyOptional()
  error?: any;

  @ApiPropertyOptional()
  success?: boolean;

  constructor(data?: Partial<HttpResponse<T>>) {
    Object.assign(this, data);
  }
}

export class PaginationMetaData {
  @ExposeApiProperty()
  page: number;

  @ExposeApiProperty()
  perPage: number;

  @ExposeApiProperty()
  total: number;
}

export class Pagination<T> {
  items: T[];

  @Expose()
  pagination?: PaginationMetaData;
}
