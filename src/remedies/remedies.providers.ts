import { DataSource } from 'typeorm';
import { Remedy } from './entities/remedy.entity';

export const remedyProviders = [
  {
    provide: 'REMEDY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Remedy),
    inject: ['DATA_SOURCE'],
  },
];
