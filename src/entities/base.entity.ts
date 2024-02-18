import { PrimaryGeneratedColumn } from 'typeorm';

export function AutoIdColumn(options: 'number' | 'uuid'): PropertyDecorator {
  if (options === 'uuid') {
    return PrimaryGeneratedColumn('uuid');
  }

  return PrimaryGeneratedColumn('increment', { type: 'bigint' });
}

export abstract class AutoIdEntity {
  @AutoIdColumn('number')
  public id: number;
}

export abstract class AutoUUIDEntity {
  @AutoIdColumn('uuid')
  public id: string;
}
