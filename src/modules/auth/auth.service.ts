import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'common/constants/app.constants';
import { ApiBadRequestException, ApiErrorDescription } from 'core/types/apiException.type';

import { LoginReqDto } from './dto/auth.request';
import { LoginResDto } from './dto/auth.response';

@Injectable()
export class AuthService {
  constructor() {}

  async login(body: LoginReqDto): Promise<LoginResDto> {
    const errorDescription = new ApiErrorDescription();

    errorDescription['categoryId'] = [ErrorCode.itemNotFound];
    errorDescription['divisionId'] = [ErrorCode.itemNotFound];

    ApiBadRequestException.checkErrorDescription(errorDescription);

    return {
      userId: 1,
      refreshToken: body.mailAddress,
      accessToken: '',
    };
  }
}
