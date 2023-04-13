import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { placeProviders } from './remedies.providers';
import { RemediesService } from './remedies.service';
import { RemediesController } from './remedies.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...placeProviders, RemediesService],
  controllers: [RemediesController],
})
export class RemediesModule {}
