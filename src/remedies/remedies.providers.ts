import { DataSource } from 'typeorm';
import { Place } from './entities/remedy.entity';

export const placeProviders = [
  {
    provide: 'REMEDY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Place),
    inject: ['DATA_SOURCE'],
  },
];
