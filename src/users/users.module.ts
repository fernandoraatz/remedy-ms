import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RemediesModule } from '../remedies/remedies.module';
import { remedyProviders } from '../remedies/remedies.providers';

@Module({
  imports: [DatabaseModule, RemediesModule],
  providers: [...userProviders, ...remedyProviders, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
