import { Module } from '@nestjs/common';

import { RemediesModule } from './remedies/remedies.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RemediesModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
