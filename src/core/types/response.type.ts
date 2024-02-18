import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageCode } from 'common/constants/messageCode';

export class HttpResponse<T> {
  @ApiPropertyOptional()
  statusCode?: HttpStatus;

  @ApiPropertyOptional()
  messageCode?: MessageCode;

  @ApiPropertyOptional()
  message?: string;

  @ApiPropertyOptional({ type: Object })
  data?: T;

  @ApiPropertyOptional()
  error?: any;

  @ApiProperty()
  success: boolean;

  constructor(data?: Partial<HttpResponse<T>>) {
    Object.assign(this, data);
  }
}
