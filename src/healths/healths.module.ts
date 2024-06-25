import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthsController } from 'src/healths/healths.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthsController],
})
export class HealthsModule {}
