import { Body, Post } from '@nestjs/common';
import { MessageCode } from 'common/constants/messageCode';
import { BaseController } from 'core/controllers/base.controller';
import { ApiController } from 'core/decorator/apiController.decorator';
import { ApiBaseOkResponse } from 'core/decorator/apiDocs/apiDoc.decorator';

import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/auth.request';
import { LoginResDto } from './dto/auth.response';

@ApiController({
  name: 'Auth',
})
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @ApiBaseOkResponse({
    description: 'Login',
    type: LoginResDto,
    messageCodeRemark: `
      ${MessageCode.wrongMailOrPassword}
    `,
  })
  @Post('login')
  async login(@Body() body: LoginReqDto) {
    return this.dataType(LoginResDto, await this.authService.login(body));
  }
}
