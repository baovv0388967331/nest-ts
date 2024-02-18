import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

import { AllowUndefined } from '../common/allowUndefined.decorator';
import { ExposeApiProperty, Options } from '../common/property.decorator';

export function ExposeApiRequiredProperty({ apiOptions, exposeOptions }: Options = {}) {
  return applyDecorators(
    ExposeApiProperty({ apiOptions: { ...apiOptions, required: true }, exposeOptions }),
    IsNotEmpty,
  );
}

export function ExposeApiOptionalProperty({ apiOptions, exposeOptions }: Options = {}) {
  return applyDecorators(
    ExposeApiProperty({ apiOptions: { ...apiOptions, required: false }, exposeOptions }),
    AllowUndefined,
  );
}
