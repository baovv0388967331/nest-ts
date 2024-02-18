import { ExposeApiProperty } from 'core/decorator/common/property.decorator';

export class LoginResDto {
  @ExposeApiProperty()
  userId: number;

  @ExposeApiProperty()
  refreshToken: string;

  @ExposeApiProperty()
  accessToken: string;
}
