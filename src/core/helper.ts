import { HttpStatus } from '@nestjs/common';

import { HttpResponse } from './types/response.type';

export const buildSuccessResponse = <T>(response: HttpResponse<T>): any => {
  if (response instanceof HttpResponse) {
    response.success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

    return response;
  }

  const res: HttpResponse<T> = { success: true };
  res.statusCode = HttpStatus.OK;
  res.data = response;

  return res;
};
