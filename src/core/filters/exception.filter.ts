import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Message } from 'common/constants/app.constants';
import { MessageCode } from 'common/constants/messageCode';
import { buildResponse } from 'core/helper';
import { logger } from 'core/logger/index.logger';
import { ApiException } from 'core/types/apiException.type';
import { HttpResponse } from 'core/types/response.type';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();

    try {
      if (!exception) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildResponse(this.getHttpResponse()));
      }

      const res = this.getHttpResponse(exception);
      if (exception instanceof TypeError) {
        logger.error(`StatusCode : ${res.statusCode}, Message : ${exception.message}, detail : ${exception.stack}`);
      } else {
        logger.error(`StatusCode : ${res.statusCode}, Message : ${res.message}`);
      }

      return response.status(res.statusCode).send(buildResponse(res));
    } catch (ex) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildResponse(this.getHttpResponse(ex)));
    }
  }

  private getHttpResponse(exception?: unknown) {
    if (exception instanceof ApiException) {
      return this.apiExceptionResponse(exception);
    }

    return new HttpResponse({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      messageCode: MessageCode.generalError,
      message: Message.generalError,
    });
  }

  private apiExceptionResponse(error: ApiException) {
    return new HttpResponse({
      success: false,
      statusCode: error.statusCode,
      messageCode: error.messageCode,
      message: error.message,
      error: error.error,
    });
  }
}
