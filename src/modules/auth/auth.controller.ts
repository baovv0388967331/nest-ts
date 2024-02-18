import { Body, Controller, Get } from '@nestjs/common';
import { BaseController } from 'core/controllers/base.controller';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Get()
  async login(@Body() reqData: AuthService) {
    return this.authService.login(reqData);
  }
}
