import { HttpStatus } from '@nestjs/common';
import { Message } from 'common/constants/app.constants';
import { MessageCode } from 'common/constants/messageCode';
import { isEmpty } from 'lodash';

export class ApiErrorDescription {
  [property: string]: string[];
}

export class ApiException {
  constructor(
    public statusCode: HttpStatus,
    public messageCode?: MessageCode,
    public message?: string,
    public error?: ApiErrorDescription,
  ) {}
}

export class ApiNotFoundException extends ApiException {
  constructor(messageCode?: MessageCode, message?: string) {
    super(HttpStatus.NOT_FOUND, messageCode ?? MessageCode.notFound, message);
  }
}

export class ApiUnauthorizedException extends ApiException {
  constructor(messageCode?: MessageCode, message?: string) {
    super(HttpStatus.UNAUTHORIZED, messageCode, message);
  }
}

export class ApiForbiddenException extends ApiException {
  constructor(messageCode?: MessageCode, message?: string) {
    super(HttpStatus.FORBIDDEN, messageCode, message);
  }
}

export class ApiBadRequestException extends ApiException {
  constructor(messageCode?: MessageCode, message?: string, errors?: ApiErrorDescription) {
    super(HttpStatus.BAD_REQUEST, messageCode, message, errors);
  }

  static checkErrorDescription(errorDescription: ApiErrorDescription, messageCode?: MessageCode, message?: string) {
    if (!isEmpty(errorDescription)) {
      throw new ApiBadRequestException(
        messageCode ?? MessageCode.invalidInput,
        message ?? Message.invalidInput,
        errorDescription ?? [],
      );
    }
  }
}

export class ApiInternalErrorException extends ApiException {
  constructor(messageCode?: MessageCode, message?: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, messageCode, message);
  }
}
