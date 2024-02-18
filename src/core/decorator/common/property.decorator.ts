import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, ExposeOptions } from 'class-transformer';

export type Options = {
  apiOptions?: ApiPropertyOptions;
  exposeOptions?: ExposeOptions;
};

export function ExposeApiProperty({ apiOptions, exposeOptions }: Options = {}) {
  return applyDecorators(ApiProperty(apiOptions), Expose(exposeOptions));
}
