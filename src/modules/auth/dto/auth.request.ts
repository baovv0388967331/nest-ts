import { ExposeApiRequiredProperty } from 'core/decorator/validators';

export class LoginReqDto {
  @ExposeApiRequiredProperty({ apiOptions: { default: 'bao@gmail.com' } })
  mailAddress: string;

  @ExposeApiRequiredProperty({ apiOptions: { default: 'abcd1234' } })
  password: string;
}
