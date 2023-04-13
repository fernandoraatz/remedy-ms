import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'pguser',
        password: 'pgpassword',
        database: 'drugstore',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity.js'],
      });

      return dataSource.initialize();
    },
  },
];
