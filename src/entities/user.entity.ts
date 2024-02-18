import { Column, Entity } from 'typeorm';

import { AutoIdEntity } from './base.entity';

@Entity('user')
export class UserEntity extends AutoIdEntity {
  @Column({
    name: 'user_name',
    length: 128,
  })
  public userName: string;

  @Column({
    length: 100,
  })
  public password: string;

  @Column({
    name: 'mail_address',
    length: 128,
    unique: true,
  })
  public mailAddress: string;

  @Column({
    name: 'login_name',
    length: 64,
    nullable: true,
    unique: true,
  })
  public loginName: string;
}
